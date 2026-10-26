/* Business Class Travel — the booking card, the fare list and the two smaller forms.
   No framework. Without this file every form still posts to quote.php with plain fields. */

const CONFIG = {
  // Where requests go: quote.php emails them to sales@business-class-travel.com.
  // Empty = stub: the request is confirmed on the page and logged to the console.
  leadEndpoint: 'quote.php',
  phone: '305-244-6463',
  fallbackOrigin: 'HKG',
  // Duffel's full airport list, downloaded to this file by tools/sync-airports.php and searched in the
  // browser, so what visitors type never leaves the page. Missing file = built-in list only.
  airportsFile: 'data/airports-duffel.json',
  // The visitor's approximate location from their IP (api/geo.php). Empty = time zone guess only.
  geoEndpoint: 'api/geo.php',
  // Unsplash photos for offer cards with none of our own (api/photo.php). Empty = Picsum photos only.
  photoEndpoint: 'api/photo.php',
  // DEMO ONLY, for showing the site before a live fare feed is connected. Each day the fare list shows
  // a different selection of the fares in the page, nudges each price by $100 to $200, and dates each
  // one within the last month. Set to false once real fares arrive: the list then shows exactly what
  // is written in index.html.
  demoFares: true,
};

/* ---------- data ---------- */
const AIRPORTS = (window.AIRPORTS || []).map(([code, city, country, lat, lon]) => ({ code, city, country, lat, lon }));
const BY_CODE = Object.fromEntries(AIRPORTS.map((a) => [a.code, a]));

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const store = {
  get() { try { return JSON.parse(localStorage.getItem('bct-quote') || 'null'); } catch { return null; } },
  set(v) { try { localStorage.setItem('bct-quote', JSON.stringify(v)); } catch {} },
};
const label = (a) => (a ? `${a.city} (${a.code})` : '');
const DAY = 86400000;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fromIso = (s) => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const shortDate = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const wide = () => matchMedia('(min-width: 48em)').matches;

/* ---------- state ---------- */
const form = $('#quote');
const state = { trip: 'round', from: null, to: null, depart: null, ret: null };

/* ---------- airport search ---------- */
function searchAirports(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const scored = [];
  for (const a of AIRPORTS) {
    const code = a.code.toLowerCase(), city = a.city.toLowerCase(), country = a.country.toLowerCase(), name = (a.name || a.aka || '').toLowerCase();
    let s = 0;
    if (code === q) s = 100;
    else if (city.startsWith(q)) s = 80;
    else if (code.startsWith(q)) s = 70;
    else if (city.split(/[\s(,'-]+/).some((w) => w.startsWith(q))) s = 60;
    else if (name && (name.startsWith(q) || name.split(/[\s(,'-]+/).some((w) => w.startsWith(q)))) s = 75; // "Heathrow", "Changi"
    else if (country.startsWith(q)) s = 40;
    else if (city.includes(q) || name.includes(q)) s = 30;
    // The built-in list holds the major hubs: on an equal match they come first.
    if (s) scored.push([s + (a.extra ? 0 : 5), a]);
  }
  // Ties: the shorter city name is the closer match ("London" before "Londolozi"), then alphabetical.
  return scored.sort((x, y) => y[0] - x[0] || x[1].city.length - y[1].city.length || x[1].city.localeCompare(y[1].city) || (x[1].name || '').localeCompare(y[1].name || '')).slice(0, 8).map((x) => x[1]);
}

// Adds Duffel's airports (downloaded ahead of time) to the search, the first time a field is used.
let fullList = null;
function loadFullAirportList() {
  if (!CONFIG.airportsFile) return Promise.resolve();
  fullList ||= fetch(CONFIG.airportsFile, { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((json) => {
      for (const [code, name, city, cc, lat, lon] of json?.airports || []) {
        if (!code) continue;
        // Airports already in the built-in list keep their short label but become findable by name ("Heathrow").
        if (BY_CODE[code]) { BY_CODE[code].aka ||= name; continue; }
        const a = { code, name, city: city || name, country: regionName(cc), lat, lon, extra: true };
        AIRPORTS.push(a);
        BY_CODE[code] = a;
      }
    })
    .catch(() => {});
  return fullList;
}

// Closest airport in the built-in list to a point (equirectangular distance is plenty at this scale).
function nearestAirport(lat, lon) {
  let best = null, bestD = Infinity;
  const k = Math.cos((lat * Math.PI) / 180);
  for (const a of AIRPORTS) {
    if (a.lat == null || a.extra) continue; // suggest a major hub, not the closest airstrip
    const d = (a.lat - lat) ** 2 + ((a.lon - lon) * k) ** 2;
    if (d < bestD) { bestD = d; best = a; }
  }
  return best;
}

// Turns a text input into a combobox. onPick(airport) is called with the chosen airport.
// Options: search(text) gives the suggestions (all airports by default); full: false skips loading the
// full airport list; showAll lists every suggestion when the field is focused empty, like a dropdown.
function airportField(input, onPick, { search: find = searchAirports, full = true, showAll = false } = {}) {
  const list = document.createElement('ul');
  list.className = 'suggest';
  list.id = input.id + '-list';
  list.setAttribute('role', 'listbox');
  list.hidden = true;
  input.parentElement.append(list);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', list.id);
  let items = [], active = -1;

  const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; };
  const render = () => {
    list.innerHTML = '';
    items.forEach((a, i) => {
      const li = document.createElement('li');
      li.id = `${list.id}-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === active ? 'true' : 'false');
      // Built with text nodes: names from the search service are never treated as markup.
      const code = document.createElement('span'); code.className = 'suggest__code'; code.textContent = a.code;
      const text = document.createElement('span'); text.textContent = a.name && a.name !== a.city ? `${a.city} · ${a.name}` : a.city;
      const country = document.createElement('span'); country.className = 'suggest__country'; country.textContent = a.country;
      text.append(country);
      li.append(code, text);
      // Commit on press, so the list never closes under the finger before the choice lands.
      li.addEventListener('pointerdown', (e) => { e.preventDefault(); pick(a); });
      list.append(li);
    });
    list.hidden = !items.length;
    input.setAttribute('aria-expanded', String(!!items.length));
    if (active >= 0) input.setAttribute('aria-activedescendant', `${list.id}-${active}`);
  };
  const pick = (a) => { BY_CODE[a.code] ||= a; input.value = label(a); close(); onPick(a); };

  const search = () => {
    if (document.activeElement !== input) return close(); // only the field being used shows its list
    items = find(input.value); active = items.length && input.value ? 0 : -1; render();
  };
  input.addEventListener('input', search);
  input.addEventListener('focus', () => {
    input.select();
    if (showAll && !input.value) search();
    if (!full) return;
    // Fetch the full list once; if the visitor is already typing when it lands, refresh their results.
    loadFullAirportList().then(() => { if (document.activeElement === input && input.value && input.value !== label(BY_CODE[input.value.match(/\(([A-Z]{3})\)$/)?.[1]])) search(); });
  });
  input.addEventListener('keydown', (e) => {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { active = Math.min(items.length - 1, active + 1); render(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { active = Math.max(0, active - 1); render(); e.preventDefault(); }
    else if (e.key === 'Enter' && active >= 0) { pick(items[active]); e.preventDefault(); }
    else if (e.key === 'Escape') close();
  });
  input.addEventListener('blur', () => {
    // A typed code or exact city name still counts without picking from the list.
    const q = input.value.trim().toLowerCase();
    if (!list.hidden && items[0] && (items[0].code.toLowerCase() === q || items[0].city.toLowerCase() === q)) pick(items[0]);
    close();
  });
  return { set(a) { input.value = label(a); } };
}

/* ---------- the visitor's location: departure airport and phone country from their IP ---------- */
async function applyGeo() {
  if (!CONFIG.geoEndpoint) return;
  let g = null;
  try { const r = await fetch(CONFIG.geoEndpoint, { headers: { Accept: 'application/json' } }); if (r.ok) g = await r.json(); } catch {}
  if (!g?.country) return; // keep the time zone guess
  if (!touched.country && !$('#phone').value) setCountry(g.country);
  if (g.lat != null && g.lon != null) {
    const near = nearestAirport(g.lat, g.lon);
    if (near && near.code !== offerOrigin?.code) { offerOrigin = near; renderOffers(); }
  }
  if (!touched.from && g.lat != null && g.lon != null) {
    const a = nearestAirport(g.lat, g.lon);
    if (a && a.code !== state.from?.code && document.activeElement !== $('#from')) { state.from = a; fromField.set(a); sync(); }
  }
}

/* ---------- calendar ---------- */
const cal = {
  el: $('#cal'), box: $('#cal-box'), scrim: $('.cal__scrim'), months: $('#cal-months'), title: $('#cal-title'),
  view: null, mode: 'depart', anim: { value: 0, velocity: 0 }, isOpen: false,

  open(mode) {
    this.mode = mode;
    const base = (mode === 'return' ? state.ret || state.depart : state.depart) || startOfDay(new Date());
    this.view = new Date(base.getFullYear(), base.getMonth(), 1);
    this.render();
    if (!this.isOpen) {
      this.isOpen = true;
      this.el.hidden = false;
      document.documentElement.classList.add('cal-open');
      this.place();
      if (!wide() && this.anim.value === 0) this.anim.value = this.box.offsetHeight;
      this.paint(this.anim.value);
      // Interrupting a close: carry on from wherever it is now.
      if (wide()) Spring.to(this.anim, 1, { damping: 1, response: 0.3, precision: 0.002, onUpdate: (v) => this.paint(v) });
      else {
        Spring.to(this.anim, 0, { damping: 1, response: 0.35, onUpdate: (v) => this.paint(v) });
      }
    }
    ($('.day.is-start, .day.is-end', this.months) || $('.day:not([disabled])', this.months))?.focus({ preventScroll: true });
  },
  close(velocity = 0) {
    if (!this.isOpen) return;
    this.isOpen = false;
    document.documentElement.classList.remove('cal-open');
    const done = () => { this.el.hidden = true; };
    if (wide()) Spring.to(this.anim, 0, { damping: 1, response: 0.22, precision: 0.002, onUpdate: (v) => this.paint(v), onRest: done });
    else Spring.to(this.anim, this.box.offsetHeight, { velocity, damping: 1, response: 0.3, onUpdate: (v) => this.paint(v), onRest: done });
    (this.mode === 'return' && state.trip === 'round' ? $('#ret') : $('#depart')).focus({ preventScroll: true });
  },
  // Desktop: a popover that grows out of the date fields. Phone: a sheet held at the bottom.
  place() {
    const b = this.box;
    if (!wide()) { b.style.cssText = ''; return; }
    const r = $('#dates').getBoundingClientRect();
    const w = b.offsetWidth, h = b.offsetHeight;
    const barH = $('.bar')?.offsetHeight || 0; // never tuck the popover under the sticky header
    const below = r.bottom + 8 + h < innerHeight - 12;
    const top = below ? r.bottom + 8 : Math.max(barH + 8, r.top - h - 8);
    const left = Math.min(Math.max(12, r.right - w), innerWidth - w - 12);
    b.style.top = `${top}px`;
    b.style.left = `${left}px`;
    b.style.transformOrigin = `${r.left + r.width / 2 - left}px ${below ? 0 : h}px`;
  },
  paint(v) {
    if (wide()) {
      this.box.style.transform = `scale(${0.94 + 0.06 * v})`;
      this.box.style.opacity = Math.max(0, Math.min(1, v));
      this.scrim.style.opacity = 0;
    } else {
      const h = this.box.offsetHeight || 1;
      this.box.style.transform = `translateY(${v}px)`;
      this.box.style.opacity = 1;
      this.scrim.style.opacity = Math.max(0, Math.min(1, 1 - v / h));
    }
  },
  render() {
    const count = wide() ? 2 : 1;
    const today = startOfDay(new Date());
    const minDate = this.mode === 'return' && state.depart ? state.depart : today;
    this.title.textContent = this.mode === 'return' ? 'Choose your return' : state.trip === 'round' ? 'Choose departure, then return' : 'Choose departure';
    this.months.innerHTML = '';
    for (let m = 0; m < count; m++) {
      const first = new Date(this.view.getFullYear(), this.view.getMonth() + m, 1);
      const wrap = document.createElement('div');
      wrap.innerHTML = `<p class="month__name">${first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>`;
      const grid = document.createElement('div');
      grid.className = 'month__grid';
      ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d) => { const s = document.createElement('span'); s.className = 'dow'; s.textContent = d; s.setAttribute('aria-hidden', 'true'); grid.append(s); });
      const offset = (first.getDay() + 6) % 7;
      for (let i = 0; i < offset; i++) grid.append(document.createElement('span'));
      const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      for (let d = 1; d <= days; d++) {
        const date = new Date(first.getFullYear(), first.getMonth(), d), t = +date;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'day';
        b.innerHTML = `<span>${d}</span>`;
        b.dataset.date = iso(date);
        b.setAttribute('aria-label', date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
        if (date < minDate) b.disabled = true;
        if (t === +today) b.classList.add('is-today');
        if (state.depart && t === +state.depart) { b.classList.add('is-start'); b.setAttribute('aria-pressed', 'true'); if (state.ret) b.classList.add('has-end'); }
        if (state.ret && t === +state.ret) { b.classList.add('is-end'); b.setAttribute('aria-pressed', 'true'); }
        if (state.depart && state.ret && t > +state.depart && t < +state.ret) b.classList.add('is-between');
        grid.append(b);
      }
      wrap.append(grid);
      this.months.append(wrap);
    }
    $('#cal-prev').disabled = this.view <= new Date(today.getFullYear(), today.getMonth(), 1);
  },
  choose(date) {
    if (this.mode === 'depart') {
      state.depart = date;
      if (state.ret && state.ret < date) state.ret = null;
      sync();
      if (state.trip === 'round') { this.mode = 'return'; this.render(); return; }
    } else {
      if (state.depart && date < state.depart) { state.depart = date; sync(); this.render(); return; }
      state.ret = date;
      sync();
    }
    this.render();
    setTimeout(() => this.close(), 160); // let the chosen day register before the calendar goes
  },
};

// Phone sheet: drag it 1:1 from the handle or header, fling it away, or let it spring back.
(() => {
  const grab = [$('.cal__grab'), $('.cal__head')];
  let dragging = false, offset = 0, history = [];
  const onDown = (e) => {
    if (wide() || e.target.closest('button')) return;
    dragging = true;
    Spring.stop(cal.anim);
    offset = e.clientY - cal.anim.value; // respect where it was grabbed
    history = [{ y: e.clientY, t: e.timeStamp }];
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const raw = e.clientY - offset;
    cal.anim.value = raw < 0 ? Spring.rubberband(raw, cal.box.offsetHeight) : raw;
    cal.paint(cal.anim.value);
    history.push({ y: e.clientY, t: e.timeStamp });
    if (history.length > 6) history.shift();
  };
  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    // Only the last 100ms count: a finger that paused before lifting has no velocity left.
    const recent = history.filter((h) => e.timeStamp - h.t <= 100);
    const a = recent[0], b = recent[recent.length - 1];
    const v = recent.length > 1 && b.t > a.t ? ((b.y - a.y) / (b.t - a.t)) * 1000 : 0; // px per second
    const rest = cal.anim.value + Spring.project(v);
    if (rest > cal.box.offsetHeight * 0.45) cal.close(v);
    else Spring.to(cal.anim, 0, { velocity: v, damping: Math.abs(v) > 300 ? 0.8 : 1, response: 0.3, onUpdate: (y) => cal.paint(y) });
  };
  grab.forEach((g) => {
    g.addEventListener('pointerdown', onDown);
    g.addEventListener('pointermove', onMove);
    g.addEventListener('pointerup', onUp);
    g.addEventListener('pointercancel', onUp);
  });
})();

/* ---------- page text can't be copied (styles.css stops selecting it); form fields work as usual ---------- */
const inField = (el) => el?.closest?.('input, textarea, [contenteditable]');
['copy', 'cut'].forEach((type) => document.addEventListener(type, (e) => { if (!inField(e.target)) e.preventDefault(); }));
document.addEventListener('dragstart', (e) => { if (!inField(e.target)) e.preventDefault(); });

/* ---------- popovers: grow from their control, close on outside press or Escape ---------- */
function popover(btn, pop, { onOpen, onClose } = {}) {
  const host = pop.parentElement;
  const api = {
    isOpen: false,
    open() {
      if (api.isOpen) return;
      api.isOpen = true;
      // Open upward when there isn't room below the control.
      const r = btn.getBoundingClientRect();
      pop.classList.toggle('is-up', innerHeight - r.bottom < Math.min(pop.offsetHeight, 360) + 16 && r.top > innerHeight - r.bottom);
      // Keep it on screen: nudge sideways when it would run past either edge.
      pop.style.marginLeft = '0px';
      const p = pop.getBoundingClientRect(), edge = 12, vw = document.documentElement.clientWidth;
      let shift = 0;
      if (p.right > vw - edge) shift = vw - edge - p.right;
      if (p.left + shift < edge) shift = edge - p.left;
      pop.style.marginLeft = `${Math.round(shift)}px`;
      pop.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      onOpen?.();
    },
    close(refocus = true) {
      if (!api.isOpen) return;
      api.isOpen = false;
      pop.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      onClose?.();
      if (refocus) btn.focus({ preventScroll: true });
    },
  };
  btn.addEventListener('click', () => (api.isOpen ? api.close() : api.open()));
  document.addEventListener('pointerdown', (e) => { if (api.isOpen && !host.contains(e.target)) api.close(false); });
  pop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); api.close(); } });
  host.addEventListener('focusout', (e) => { if (api.isOpen && e.relatedTarget && !host.contains(e.relatedTarget)) api.close(false); });
  return api;
}

/* ---------- trip and cabin: our own list in place of the browser's select menu ---------- */
// The <select> stays in the form (hidden) and keeps the value, so posting, saving and any code that
// sets .value carry on as before; the button and list only show it and change it.
function selectMenu(select) {
  const id = select.id;
  const wrap = select.parentElement;
  const host = document.createElement('div');
  host.className = 'menu';
  host.innerHTML = `<button type="button" class="pick pick--btn" id="${id}-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}-pop"></button>
    <ul class="pop menu__pop" id="${id}-pop" role="listbox" tabindex="-1" aria-label="${select.getAttribute('aria-label')}">${
      [...select.options].map((o, i) => `<li class="menu__opt" id="${id}-opt-${i}" role="option" data-i="${i}">${o.text}</li>`).join('')}</ul>`;
  wrap.replaceWith(host);
  host.append(select);
  select.hidden = true;
  select.tabIndex = -1;
  const btn = $('button', host), list = $('ul', host), opts = $$('li', list);
  let active = 0;

  const highlight = (i) => {
    active = (i + opts.length) % opts.length;
    opts.forEach((o, n) => o.classList.toggle('is-active', n === active));
    list.setAttribute('aria-activedescendant', opts[active].id);
  };
  const render = () => {
    const i = Math.max(0, select.selectedIndex);
    btn.textContent = select.options[i].text;
    btn.setAttribute('aria-label', `${select.getAttribute('aria-label')}: ${select.options[i].text}`);
    opts.forEach((o, n) => o.setAttribute('aria-selected', String(n === i)));
  };
  const menu = popover(btn, list, { onOpen: () => { highlight(select.selectedIndex); list.focus({ preventScroll: true }); } });
  const choose = (i) => {
    const changed = i !== select.selectedIndex;
    select.selectedIndex = i;
    render();
    menu.close();
    if (changed) select.dispatchEvent(new Event('change', { bubbles: true }));
  };

  // Code elsewhere sets select.value directly (restoring a saved search, "Check availability"): keep the button in step.
  const native = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  Object.defineProperty(select, 'value', { configurable: true, get() { return native.get.call(this); }, set(v) { native.set.call(this, v); render(); } });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); menu.open(); }
  });
  list.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: opts.length - 1 };
    if (e.key in keys) { e.preventDefault(); highlight(keys[e.key]); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Tab') menu.close(false);
    else if (e.key.length === 1) {
      // Typing a letter jumps to the next option that starts with it.
      const k = e.key.toLowerCase();
      const next = opts.findIndex((o, n) => n > active && o.textContent.toLowerCase().startsWith(k));
      const hit = next >= 0 ? next : opts.findIndex((o) => o.textContent.toLowerCase().startsWith(k));
      if (hit >= 0) highlight(hit);
    }
  });
  list.addEventListener('pointermove', (e) => { const o = e.target.closest('.menu__opt'); if (o) highlight(Number(o.dataset.i)); });
  list.addEventListener('click', (e) => { const o = e.target.closest('.menu__opt'); if (o) choose(Number(o.dataset.i)); });
  render();
}
selectMenu($('#trip'));
selectMenu($('#cabin'));

/* ---------- passengers: adults and children, typed or stepped ---------- */
const PAX_MAX = 99;
const pax = { adults: 1, children: 0 };
const paxPop = popover($('#pax-btn'), $('#pax-pop'), { onOpen: () => $('#adults').focus({ preventScroll: true }) });

function setPax(kind, n) {
  const min = kind === 'adults' ? 1 : 0;
  pax[kind] = Math.max(min, Math.min(PAX_MAX, Math.round(Number(n)) || min));
  renderPax();
  sync();
}

function renderPax() {
  for (const kind of ['adults', 'children']) {
    const min = kind === 'adults' ? 1 : 0;
    const input = $(`#${kind}`);
    if (document.activeElement !== input) input.value = pax[kind];
    $(`[data-pax="${kind}"][data-d="-1"]`).disabled = pax[kind] <= min;
    $(`[data-pax="${kind}"][data-d="1"]`).disabled = pax[kind] >= PAX_MAX;
  }
  const a = `${pax.adults} ${pax.adults === 1 ? 'Adult' : 'Adults'}`;
  $('#pax-label').textContent = pax.children ? `${a}, ${pax.children} ${pax.children === 1 ? 'Child' : 'Children'}` : a;
  $('#pax').value = pax.adults + pax.children;
  $('#pax-note').hidden = pax.adults + pax.children <= 9;
}

function initPax() {
  $$('[data-pax]').forEach((b) => b.addEventListener('click', () => setPax(b.dataset.pax, pax[b.dataset.pax] + Number(b.dataset.d))));
  for (const kind of ['adults', 'children']) {
    const input = $(`#${kind}`);
    input.addEventListener('focus', () => input.select());
    input.addEventListener('input', () => {
      const digits = input.value.replace(/\D/g, '').slice(0, 2);
      input.value = digits;
      if (digits !== '') setPax(kind, digits);
    });
    input.addEventListener('blur', () => { input.value = pax[kind]; });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); setPax(kind, pax[kind] + (e.key === 'ArrowUp' ? 1 : -1)); input.value = pax[kind]; input.select(); }
      else if (e.key === 'Enter') { e.preventDefault(); paxPop.close(); }
    });
  }
  $('#pax-done').addEventListener('click', () => paxPop.close());
  renderPax();
}

/* ---------- phone: country code picker and formatting as you type, for every country ---------- */
const PN = window.libphonenumber;
const regionName = (() => {
  try { const long = new Intl.DisplayNames(['en'], { type: 'region' }); return (c) => long.of(c) || c; } catch { return (c) => c; }
})();
const COUNTRIES = PN ? PN.getCountries().map((c) => ({ iso: c, name: regionName(c), dial: PN.getCountryCallingCode(c) })).sort((a, b) => a.name.localeCompare(b.name)) : [];
const COUNTRY = Object.fromEntries(COUNTRIES.map((c) => [c.iso, c]));
const ISO_BY_NAME = (() => {
  const map = {};
  let short = null;
  try { short = new Intl.DisplayNames(['en'], { type: 'region', style: 'short' }); } catch {}
  for (const c of COUNTRIES) { map[c.name.toLowerCase()] = c.iso; if (short) map[(short.of(c.iso) || '').toLowerCase()] = c.iso; }
  return map;
})();
const phone = { country: 'HK', lastDigits: '', lastPlus: false, list: [], active: 0 };

function guessCountry() {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch {}
  const hub = BY_CODE[(window.TZ_HUBS || {})[tz]];
  if (hub && ISO_BY_NAME[hub.country.toLowerCase()]) return ISO_BY_NAME[hub.country.toLowerCase()];
  for (const l of navigator.languages || []) {
    const region = (l.split('-')[1] || '').toUpperCase();
    if (COUNTRY[region]) return region;
  }
  return 'HK';
}

function setCountry(iso, reformat = true) {
  if (!COUNTRY[iso]) return;
  phone.country = iso;
  const c = COUNTRY[iso];
  $('#cc-label').textContent = `+${c.dial}`;
  $('#cc-btn').setAttribute('aria-label', `Country code: ${c.name} +${c.dial}`);
  $('#phone-country').value = iso;
  if (reformat) formatPhone();
}

// Rebuilds the number in the country's own format and keeps the caret beside the same digit.
function formatPhone(e) {
  const el = $('#phone');
  if (!PN) return;
  const raw = el.value;
  const caret = el.selectionStart ?? raw.length;
  let before = raw.slice(0, caret).replace(/\D/g, '').length;
  const plus = raw.trimStart().startsWith('+');
  let digits = raw.replace(/\D/g, '').slice(0, 15);
  // Deleting only a space, bracket or dash would be undone by the formatter: remove the digit beside it instead.
  if (e?.inputType?.startsWith('delete') && digits === phone.lastDigits && plus === phone.lastPlus) {
    if (e.inputType === 'deleteContentBackward' && before > 0) { digits = digits.slice(0, before - 1) + digits.slice(before); before--; }
    else if (e.inputType === 'deleteContentForward') digits = digits.slice(0, before) + digits.slice(before + 1);
  }
  const typer = plus ? new PN.AsYouType() : new PN.AsYouType(phone.country);
  const out = digits ? typer.input((plus ? '+' : '') + digits) : plus ? '+' : '';
  if (plus) { const found = typer.getCountry(); if (found && found !== phone.country) setCountry(found, false); }
  el.value = out;
  phone.lastDigits = digits; phone.lastPlus = plus;
  if (document.activeElement === el) {
    let pos = plus ? 1 : 0, seen = 0;
    while (pos < out.length && seen < before) { if (/\d/.test(out[pos])) seen++; pos++; }
    el.setSelectionRange(pos, pos);
  }
  const parsed = PN.parsePhoneNumberFromString(out, phone.country);
  $('#phone-e164').value = parsed?.isValid() ? parsed.number : '';
}

const ccPop = popover($('#cc-btn'), $('#cc-pop'), {
  onOpen: () => { $('#cc-search').value = ''; renderCountries(); $('#cc-search').focus({ preventScroll: true }); },
});

function renderCountries() {
  const q = $('#cc-search').value.trim().toLowerCase().replace(/^\+/, '');
  phone.list = !q ? COUNTRIES : COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.iso.toLowerCase() === q || c.dial.startsWith(q))
    .sort((a, b) => (b.name.toLowerCase().startsWith(q) - a.name.toLowerCase().startsWith(q)) || (b.dial === q) - (a.dial === q));
  const current = phone.list.findIndex((c) => c.iso === phone.country);
  phone.active = q ? 0 : Math.max(0, current);
  const list = $('#cc-list');
  list.innerHTML = '';
  if (!phone.list.length) { list.innerHTML = '<li class="cc__empty" role="presentation">No country matches that search.</li>'; return; }
  phone.list.forEach((c, i) => {
    const li = document.createElement('li');
    li.id = `cc-${c.iso}`;
    li.setAttribute('role', 'option');
    li.className = c.iso === phone.country ? 'is-current' : '';
    li.innerHTML = `<span>${c.name}</span><span class="cc__dial">+${c.dial}</span>`;
    li.addEventListener('pointerdown', (e) => { e.preventDefault(); pickCountry(c.iso); });
    list.append(li);
  });
  markActive();
}

function markActive() {
  $$('#cc-list [role="option"]').forEach((li, i) => li.setAttribute('aria-selected', i === phone.active ? 'true' : 'false'));
  const li = $$('#cc-list [role="option"]')[phone.active];
  if (li) { $('#cc-search').setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
}

// Set once the visitor chooses for themselves, so the IP lookup never overrides them.
const touched = { from: false, country: false };

function pickCountry(iso) {
  touched.country = true;
  setCountry(iso);
  ccPop.close(false);
  $('#phone').focus();
  clearErr('phone');
}

function initPhone() {
  if (!PN) { $('#cc-btn').hidden = true; $('#phone').placeholder = 'Including country code'; return; }
  setCountry(guessCountry(), false);
  $('#cc-search').addEventListener('input', renderCountries);
  $('#cc-search').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); phone.active = Math.max(0, Math.min(phone.list.length - 1, phone.active + (e.key === 'ArrowDown' ? 1 : -1))); markActive(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (phone.list[phone.active]) pickCountry(phone.list[phone.active].iso); }
  });
  $('#phone').addEventListener('input', (e) => { touched.country = true; formatPhone(e); clearErr('phone'); });
}

/* ---------- booking card ---------- */
const fromField = airportField($('#from'), (a) => { touched.from = true; state.from = a; sync(); if (!state.to) $('#to').focus(); });
const toField = airportField($('#to'), (a) => { state.to = a; sync(); if (!state.depart) setTimeout(() => cal.open('depart'), 120); });

function setTrip(trip) {
  state.trip = trip;
  form.dataset.trip = trip;
  $('#trip').value = trip;
  if (trip !== 'round') state.ret = null;
  sync();
}

function clearErr(id) {
  const el = $(`#err-${id}`);
  if (el) el.textContent = '';
  $(`#${id}`)?.closest('.fld, .line')?.classList.remove('has-error');
}

function showErr(id, msg) {
  $(`#err-${id}`).textContent = msg;
  $(`#${id}`).closest('.fld, .line').classList.add('has-error');
}

function sync() {
  $('#from-code').value = state.from?.code || '';
  $('#to-code').value = state.to?.code || '';
  $('#depart').value = state.depart ? shortDate(state.depart) : $('#flex').checked && !state.depart ? 'Flexible' : '';
  $('#ret').value = state.ret ? shortDate(state.ret) : '';
  $('#depart-iso').value = state.depart ? iso(state.depart) : '';
  $('#ret-iso').value = state.ret ? iso(state.ret) : '';
  $('#flex-val').value = $('#flex').checked ? 'yes' : '';
  if (state.from) clearErr('from');
  if (state.to) clearErr('to');
  if (state.depart || $('#flex').checked) clearErr('depart');
  if (state.ret || $('#flex').checked || state.trip !== 'round') clearErr('ret');
  const keep = (a) => a && { code: a.code, city: a.city, country: a.country, name: a.name, lat: a.lat, lon: a.lon };
  store.set({ trip: state.trip, from: keep(state.from), to: keep(state.to), fromChosen: touched.from || undefined, depart: state.depart && iso(state.depart), ret: state.ret && iso(state.ret), adults: pax.adults, children: pax.children, cabin: $('#cabin').value, flex: $('#flex').checked });
}

function detectOrigin() {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch {}
  return BY_CODE[(window.TZ_HUBS || {})[tz]] || BY_CODE[CONFIG.fallbackOrigin];
}

// A real address shape: no spaces, one @, no doubled or edge dots, and a domain ending of two letters or more.
const isEmail = (v) => v.length <= 254 && /^[^\s@"(),:;<>[\\\]]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(v) && !/\.\.|^\.|\.@/.test(v);
// A number that exists in its country's numbering plan (or, without the library, a plausible length).
const isPhone = (v, country = phone.country) => (PN ? PN.isValidPhoneNumber(v, v.trim().startsWith('+') ? undefined : country) : v.replace(/\D/g, '').length >= 7);

function validate() {
  const errors = {};
  if (!state.from) errors.from = 'Please choose a departure city.';
  if (!state.to) errors.to = 'Please choose a destination.';
  if (state.from && state.to && state.from.code === state.to.code) errors.to = 'Please choose a different destination.';
  const flex = $('#flex').checked;
  if (!state.depart && !flex) errors.depart = 'Please choose a date.';
  if (state.trip === 'round' && state.depart && !state.ret && !flex) errors.ret = 'Please choose a date.';
  if (state.trip === 'multi' && !$('#legs').value.trim()) errors.legs = 'Please add your other flights.';
  const name = $('#name').value.trim();
  if (!name) errors.name = 'Please add your name.';
  else if (name.replace(/[^\p{L}]/gu, '').length < 2) errors.name = 'Please add your full name.';
  const email = $('#email').value.trim(), tel = $('#phone').value.trim();
  if (!email) errors.email = 'Please add your email address.';
  else if (!isEmail(email)) errors.email = 'Please check your email address.';
  if (!tel) errors.phone = 'Please add your phone number.';
  else if (!isPhone(tel)) errors.phone = `Please check the number. It doesn’t match the format for ${COUNTRY[phone.country]?.name || 'the selected country'}.`;
  ['from', 'to', 'depart', 'ret', 'legs', 'name', 'email', 'phone'].forEach(clearErr);
  for (const [k, msg] of Object.entries(errors)) showErr(k, msg);
  return errors;
}

// "Hong Kong (HKG), Hong Kong International Airport, Hong Kong" for the sales email.
const place = (a) => [`${a.city} (${a.code})`, a.name, a.country].filter(Boolean).join(', ');

// Sends any of the three forms. Without an endpoint the request is confirmed on the page and logged.
async function sendLead(lead) {
  if (!CONFIG.leadEndpoint) { console.info('[Business Class Travel] Request (stub, no endpoint set):', lead); return; }
  const res = await fetch(CONFIG.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(lead) });
  if (!res.ok) throw new Error('Request failed');
}

async function submit(e) {
  e.preventDefault();
  if ($('#hp').value) return; // honeypot
  const first = Object.keys(validate())[0];
  if (first) {
    if (first === 'depart' || first === 'ret') cal.open(first === 'ret' ? 'return' : 'depart');
    else $(`#${first}`).focus();
    return;
  }
  const lead = {
    type: 'booking', trip: state.trip, from: state.from.code, to: state.to.code, fromLabel: place(state.from), toLabel: place(state.to),
    depart: state.depart ? iso(state.depart) : null, return: state.ret ? iso(state.ret) : null,
    flexible: $('#flex').checked, legs: state.trip === 'multi' ? $('#legs').value.trim() : '',
    adults: pax.adults, children: pax.children, passengers: pax.adults + pax.children, cabin: $('#cabin').value,
    name: $('#name').value.trim(), email: $('#email').value.trim(),
    phone: PN.parsePhoneNumberFromString($('#phone-e164').value || '')?.formatInternational() || $('#phone').value.trim(), phoneCountry: phone.country,
    page: location.href, at: new Date().toISOString(),
  };
  const btn = $('#send');
  btn.disabled = true; btn.textContent = 'Sending…';
  $('#err-send').textContent = '';
  try {
    await sendLead(lead);
    $('#done-text').textContent = `Thank you, ${lead.name.split(' ')[0]}. A consultant is preparing fares from ${state.from.city} to ${state.to.city} and will reply to ${lead.email}.`;
    form.classList.add('is-done');
    $('#done').hidden = false;
    $('#done h2').focus();
  } catch {
    $('#err-send').textContent = `Your request could not be sent. Please try again, or call us on ${CONFIG.phone}.`;
  } finally {
    btn.disabled = false; btn.textContent = 'Request a Free Quote';
  }
}

// "Check availability" and "Book" carry a route: fill it in and bring the card into view.
function useRoute(link) {
  const a = BY_CODE[link.dataset.from], b = BY_CODE[link.dataset.to];
  if (!a || !b) return;
  touched.from = true;
  state.from = a; state.to = b;
  fromField.set(a); toField.set(b);
  if (link.dataset.cabin) $('#cabin').value = link.dataset.cabin;
  form.classList.remove('is-done'); $('#done').hidden = true;
  sync();
  $('#quote').scrollIntoView({ behavior: Spring.reduced.matches ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => $('#depart').focus({ preventScroll: true }), Spring.reduced.matches ? 0 : 450);
}

/* ---------- fare offers: cards drawn from the featured rows of the fare list ---------- */
// Our own photograph of every destination in the fare list (img/credits.json). A destination added later
// gets one from Unsplash (api/photo.php), or a Picsum city skyline.
const PHOTOS = {
  HKG: ['hongkong', 1400, 875, '45% center', 'Hong Kong skyline at night'],
  SIN: ['singapore', 900, 600, '50% 40%', 'Marina Bay, Singapore, at night'],
  HND: ['tokyo', 900, 507, '62% center', 'Tokyo at night with Tokyo Tower lit'],
  NRT: ['tokyo', 900, 507, '62% center', 'Tokyo at night with Tokyo Tower lit'],
  SYD: ['sydney', 1000, 667, 'center', 'Darling Harbour, Sydney, at night'],
  LHR: ['london', 900, 335, 'center', 'London'],
  LGW: ['london', 900, 335, 'center', 'London'],
  CDG: ['paris', 900, 577, 'center', 'Paris'],
  FCO: ['rome', 900, 567, 'center', 'Rome'],
  DXB: ['dubai', 900, 600, 'center', 'Dubai'],
  AKL: ['auckland', 900, 600, 'center', 'Auckland'],
  AMS: ['amsterdam', 900, 600, 'center', 'Amsterdam'],
  ATH: ['athens', 900, 675, 'center', 'Athens'],
  AUH: ['abudhabi', 900, 563, 'center', 'Abu Dhabi'],
  BOG: ['bogota', 900, 600, 'center', 'Bogotá'],
  BOM: ['mumbai', 900, 675, 'center', 'Mumbai'],
  CAI: ['cairo', 900, 600, 'center', 'Cairo'],
  CPT: ['capetown', 900, 377, 'center', 'Cape Town'],
  DOH: ['doha', 900, 600, 'center', 'Doha'],
  DUB: ['dublin', 900, 445, 'center', 'Dublin'],
  FRA: ['frankfurt', 900, 420, 'center', 'Frankfurt'],
  IST: ['istanbul', 900, 506, 'center', 'Istanbul'],
  JFK: ['newyork', 900, 600, 'center', 'New York'],
  JNB: ['johannesburg', 900, 600, 'center', 'Johannesburg'],
  LAX: ['losangeles', 900, 506, 'center', 'Los Angeles'],
  MAD: ['madrid', 900, 600, 'center', 'Madrid'],
  MEX: ['mexicocity', 900, 600, 'center', 'Mexico City'],
  MIA: ['miami', 900, 605, 'center', 'Miami'],
  MUC: ['munich', 900, 600, 'center', 'Munich'],
  ORD: ['chicago', 900, 506, 'center', 'Chicago'],
  PEK: ['beijing', 900, 600, 'center', 'Beijing'],
  ZRH: ['zurich', 900, 600, 'center', 'Zurich'],
};
// Picsum stand-ins, all city skylines, for a destination we have no photo of yet.
const CITYSCAPES = [1067, 122, 249, 283, 288, 391, 411, 420];
const PLANE = '<svg viewBox="0 0 64 20" width="64" height="20" aria-hidden="true"><path d="M2 10h22M40 10h22" stroke="#B9C4DC" stroke-width="1.5"/><path d="M49 10l-10-1.6-4-5.4h-2l2 5.4-5 .4-2-2.8h-1.5l1 3.2-1 3.2H28l2-2.8 5 .4-2 5.4h2l4-5.4z" fill="#0F2A78"/></svg>';

// The visitor's city for the offers: their IP location once known, the time zone guess until then.
let offerOrigin = null;
const OFFER_HUBS = ['HKG', 'SIN']; // our home markets fill any card the visitor's city can't

// Three offers: the cheapest routes from the visitor's city, then Hong Kong and Singapore in turn.
function pickOffers(origin) {
  const rows = $$('#fare-rows tr');
  const byPrice = (a, b) => Number(a.dataset.price) - Number(b.dataset.price);
  const local = origin ? rows.filter((r) => r.dataset.from === origin.code || r.dataset.fromCity === origin.city).sort(byPrice) : [];
  const picks = local.slice(0, 3);
  const queues = OFFER_HUBS.map((hub) => rows.filter((r) => r.dataset.from === hub && !picks.includes(r)).sort(byPrice));
  for (let i = 0; picks.length < 3 && queues.some((q) => q.length); i++) {
    const r = queues[i % queues.length].shift();
    if (r) picks.push(r);
  }
  return picks;
}

function renderOffers(origin = offerOrigin) {
  const box = $('#offer-cards');
  if (!box) return;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const picks = pickOffers(origin);
  // The title names the cities the offers leave from, the visitor's own first.
  const cities = [...new Set(picks.map((r) => r.dataset.fromCity))];
  const list = cities.length > 1 ? `${cities.slice(0, -1).join(', ')} and ${cities.at(-1)}` : cities[0];
  if (list) $('#deals-title').textContent = `Business Class from ${list}`;
  box.innerHTML = picks.map((r, i) => {
    const d = r.dataset, cells = r.cells;
    // Our photograph of the destination, or a Picsum stand-in until Unsplash finds one (photoFor).
    const [file, w, h, pos, alt] = PHOTOS[d.to] || [];
    const img = file
      ? `<img src="img/${file}.webp" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async" style="object-position:${pos}">`
      : `<img src="https://picsum.photos/id/${CITYSCAPES[[...d.to].reduce((n, c) => n + c.charCodeAt(0), 0) % CITYSCAPES.length]}/800/450" width="800" height="450" alt="" loading="lazy" decoding="async" data-city="${esc(d.toCity)}">`;
    const airline = cells[2].textContent.trim(), cabin = cells[3].querySelector('strong')?.textContent.trim() || 'Business';
    const price = cells[5].querySelector('b')?.textContent.trim() || '';
    const cabinLink = /first/i.test(cabin) ? ' data-cabin="first"' : '';
    return `<article class="card" data-reveal style="--i:${i + 1}">
      <div class="card__img">${img}${d.saving ? `<span class="card__tag">Save ${esc(d.saving)}</span>` : ''}</div>
      <div class="card__route"><span><b>${esc(d.from)}</b>${esc(d.fromCity)}</span>${PLANE}<span class="to"><b>${esc(d.to)}</b>${esc(d.toCity)}</span></div>
      <p class="card__meta" title="${esc(`${airline} · ${cabin} Class`)}">${esc(airline)} · ${esc(cabin)} Class</p>
      <div class="card__foot"><p class="card__price">${esc(price)}</p><a class="button button--blue" href="#quote" data-from="${esc(d.from)}" data-to="${esc(d.to)}"${cabinLink}>Check availability <span class="sr-only">from ${esc(d.fromCity)} to ${esc(d.toCity)}</span></a></div>
    </article>`;
  }).join('');
  $$('img[data-city]', box).forEach(photoFor);
  // New cards arrive after motion.js has looked for reveals: show them as they scroll in.
  const cards = $$('.card', box);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    cards.forEach((c) => io.observe(c));
  } else cards.forEach((c) => c.classList.add('is-in'));
}

// Swaps a card's Picsum stand-in for an Unsplash photo of the city, credited as Unsplash asks.
// With no key in .env, or if Unsplash has nothing, the Picsum photo stays.
const photoCache = {};
function photoFor(img) {
  const city = img.dataset.city;
  if (!CONFIG.photoEndpoint) return;
  photoCache[city] ||= fetch(`${CONFIG.photoEndpoint}?q=${encodeURIComponent(city)}`)
    .then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  photoCache[city].then((p) => {
    if (!p.url || !img.isConnected) return;
    img.src = p.url;
    img.alt = p.alt;
    const credit = document.createElement('p');
    credit.className = 'card__credit';
    credit.append('Photo: ');
    const a = (href, text) => Object.assign(document.createElement('a'), { href, textContent: text, target: '_blank', rel: 'noopener' });
    credit.append(a(p.profile, p.credit), ' / ', a(p.page, 'Unsplash'));
    img.after(credit);
  });
}

/* ---------- fare list ---------- */
// Demo mode: today's selection, prices and "Checked" dates. Seeded by the date, so every visitor sees
// the same list all day and a different one tomorrow.
function demoFares(body, rand) {
  const today = startOfDay(new Date());
  for (const r of $$('tr', body)) {
    // About three in four fares show each day; our Asia Pacific departures always stay for the offers.
    if (!r.hasAttribute('data-keep') && rand() < 0.25) { r.remove(); continue; }
    const base = Number(r.dataset.base ||= r.dataset.price);
    const step = rand() < 0.5 ? 100 : 200;
    const price = Math.max(500, base + (rand() < 0.5 ? -step : step));
    r.dataset.price = price;
    r.querySelector('.price b').textContent = `$${price.toLocaleString('en-US')}`;
    const checked = new Date(+today - Math.floor(rand() * 30) * DAY);
    const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][checked.getMonth()];
    r.querySelector('.price span:last-child').textContent = `Checked ${checked.getDate()} ${mon} ${checked.getFullYear()}`;
  }
}

function initFares() {
  const body = $('#fare-rows');
  const day = Math.floor(Date.now() / DAY);
  let seed = day;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  if (CONFIG.demoFares && body) demoFares(body, rand);
  offerOrigin = detectOrigin();
  renderOffers();
  // A new order each day (the same all day), so regular visitors see different routes at the top.
  const shuffled = $$('tr', body);
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  shuffled.forEach((r) => body.append(r));
  const rows = $$('#fare-rows tr');
  if (!rows.length) return;
  // From and To work like the booking card: type a city or code, or pick one of the cities in the list.
  const places = (side) => {
    const seen = new Map();
    rows.forEach((r) => seen.set(r.dataset[side], { code: r.dataset[side], city: r.dataset[side + 'City'], country: BY_CODE[r.dataset[side]]?.country || '' }));
    return [...seen.values()].sort((x, y) => x.city.localeCompare(y.city));
  };
  const norm = (v) => v.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
  // A picked place ("Hong Kong (HKG)") matches its code exactly; typed text matches any city or code containing every word.
  const test = (q) => {
    const code = q.match(/\(([A-Z]{3})\)$/)?.[1];
    if (code) return (c) => c === code;
    const words = norm(q).split(/[\s,]+/).filter(Boolean);
    return (c, city) => words.every((w) => norm(`${city} ${c}`).includes(w));
  };
  const suggest = (side) => {
    const all = places(side);
    return (q) => {
      if (!q.trim()) return all;
      const ok = test(q), n = norm(q);
      return all.filter((p) => ok(p.code, p.city))
        .sort((x, y) => (norm(y.code) === n) - (norm(x.code) === n) || norm(y.city).startsWith(n) - norm(x.city).startsWith(n));
    };
  };
  const apply = () => {
    const f = $('#f-from').value.trim(), t = $('#f-to').value.trim();
    const fromOk = test(f), toOk = test(t);
    let shown = 0;
    rows.forEach((r) => {
      const ok = (!f || fromOk(r.dataset.from, r.dataset.fromCity)) && (!t || toOk(r.dataset.to, r.dataset.toCity));
      r.hidden = !ok;
      if (ok) shown++;
    });
    $('#fares-empty').hidden = shown > 0;
    $('#fares-count').textContent = shown ? `Showing ${shown} of ${rows.length} fares` : '';
  };
  ['from', 'to'].forEach((side) => {
    const input = $(`#f-${side}`);
    airportField(input, apply, { search: suggest(side), full: false, showAll: true });
    input.addEventListener('input', apply);
  });
  apply();
}

/* ---------- corporate and enquiry forms ---------- */
function smallForm(el, check, toLead) {
  if (!el) return;
  el.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (el.querySelector('[name="company_website"]').value) return;
    const errors = check();
    const first = Object.keys(errors)[0];
    if (first) { $(`#${first}`).focus(); return; }
    const btn = el.querySelector('button[type="submit"]'), label = btn.textContent;
    const sendErr = el.querySelector('[data-send-err]');
    btn.disabled = true; btn.textContent = 'Sending…'; sendErr.textContent = '';
    try {
      await sendLead({ ...toLead(), page: location.href, at: new Date().toISOString() });
      el.classList.add('is-done');
      const done = el.querySelector('.done');
      done.hidden = false;
      done.querySelector('h3').focus();
    } catch {
      sendErr.textContent = `Your request could not be sent. Please try again, or call us on ${CONFIG.phone}.`;
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });
}

function checkFields(rules) {
  const errors = {};
  for (const [id, test, msg] of rules) {
    clearErr(id);
    if (!test($(`#${id}`).value.trim())) { errors[id] = msg; showErr(id, msg); }
  }
  return errors;
}

/* ---------- start ---------- */
function init() {
  // Swap the native date inputs for the calendar.
  for (const id of ['depart', 'ret']) {
    const input = $(`#${id}`);
    input.type = 'text';
    input.readOnly = true;
    input.removeAttribute('name');
    const mode = id === 'ret' ? 'return' : 'depart';
    input.addEventListener('click', () => cal.open(mode));
    input.addEventListener('keydown', (e) => { if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); cal.open(mode); } });
  }
  $('#cal-done').addEventListener('click', () => cal.close());
  $('[data-cal-close]').addEventListener('click', () => cal.close());
  $('#cal-prev').addEventListener('click', () => { cal.view.setMonth(cal.view.getMonth() - 1); cal.render(); });
  $('#cal-next').addEventListener('click', () => { cal.view.setMonth(cal.view.getMonth() + 1); cal.render(); });
  cal.months.addEventListener('click', (e) => { const b = e.target.closest('.day'); if (b && !b.disabled) cal.choose(fromIso(b.dataset.date)); });
  cal.months.addEventListener('keydown', (e) => {
    const b = e.target.closest('.day'); if (!b) return;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = iso(new Date(+fromIso(b.dataset.date) + step * DAY));
    let el = $(`.day[data-date="${next}"]`, cal.months);
    if (!el) { cal.view.setMonth(cal.view.getMonth() + (step > 0 ? 1 : -1)); cal.render(); el = $(`.day[data-date="${next}"]`, cal.months); }
    el?.focus();
  });
  cal.el.addEventListener('keydown', (e) => { if (e.key === 'Escape') cal.close(); });
  addEventListener('resize', () => { if (cal.isOpen) { cal.place(); cal.paint(cal.anim.value); } });

  $('#trip').addEventListener('change', (e) => setTrip(e.target.value));
  ['cabin', 'flex'].forEach((id) => $(`#${id}`).addEventListener('change', sync));
  ['name', 'email', 'legs'].forEach((id) => $(`#${id}`).addEventListener('input', () => clearErr(id)));
  initPax();
  initPhone();
  form.addEventListener('submit', submit);
  $('#again').addEventListener('click', () => { form.classList.remove('is-done'); $('#done').hidden = true; $('#to').focus(); });
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-from][data-to]');
    if (link) { e.preventDefault(); useRoute(link); }
  });

  // Restore an earlier request, or start from the visitor's nearest hub.
  const saved = store.get();
  // Saved airports may come from the search service, so they are kept whole, not just as a code.
  const restore = (v) => (typeof v === 'string' ? BY_CODE[v] : v?.code ? (BY_CODE[v.code] ||= v) : null);
  touched.from = !!saved?.fromChosen;
  // Start from the last departure city (chosen or located) so returning visitors see no jump; the IP lookup may still refine it.
  state.from = restore(saved?.from) || detectOrigin();
  if (saved) {
    state.to = restore(saved.to);
    const today = startOfDay(new Date());
    state.depart = fromIso(saved.depart); if (state.depart && state.depart < today) state.depart = null;
    state.ret = state.depart ? fromIso(saved.ret) : null;
    if (saved.adults) pax.adults = saved.adults;
    if (saved.children) pax.children = saved.children;
    renderPax();
    if (saved.cabin === 'business' || saved.cabin === 'first') $('#cabin').value = saved.cabin;
    $('#flex').checked = !!saved.flex;
  }
  fromField.set(state.from);
  if (state.to) toField.set(state.to);
  setTrip(['oneway', 'multi'].includes(saved?.trip) ? saved.trip : 'round');

  initFares();
  applyGeo();
  smallForm($('#corp-form'), () => checkFields([
    ['c-company', (v) => v.length >= 2, 'Please add your company name.'],
    ['c-email', isEmail, 'Please add a valid work email address.'],
  ]), () => ({ type: 'corporate', company: $('#c-company').value.trim(), email: $('#c-email').value.trim(), travellers: $('#c-size').value }));
  smallForm($('#enquire-form'), () => checkFields([
    ['e-name', (v) => v.replace(/[^\p{L}]/gu, '').length >= 2, 'Please add your full name.'],
    ['e-contact', (v) => isEmail(v) || isPhone(v), 'Please add a valid email address, or a phone number with its country code.'],
    ['e-trip', (v) => v.length >= 3, 'Please tell us where and when you would like to travel.'],
  ]), () => ({ type: 'enquiry', name: $('#e-name').value.trim(), contact: $('#e-contact').value.trim(), itinerary: $('#e-trip').value.trim() }));
}

if (form) init();
