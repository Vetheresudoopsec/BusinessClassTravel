/* BusinessClassTravel — quote panel, routes and fares.
   No framework. The page works without this file: the form posts to quote.php with plain fields. */

const CONFIG = {
  // Where quote requests go. Empty = stub: the request is confirmed on the page and logged to the console.
  // To go live on HostGator, set a recipient in quote.php and change this to 'quote.php'.
  leadEndpoint: '',
  phone: '+1 (888) 555-0199',
  fallbackOrigin: 'JFK',
};

/* ---------- data and pricing ---------- */
const AIRPORTS = (window.AIRPORTS || []).map(([code, city, country, lat, lon, region]) => ({ code, city, country, lat, lon, region }));
const BY_CODE = Object.fromEntries(AIRPORTS.map((a) => [a.code, a]));
const FEATURED = window.FEATURED || [];
const FEATURED_BY_CODE = Object.fromEntries(FEATURED.map((f) => [f.code, f]));
const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const rad = (d) => (d * Math.PI) / 180;
function distanceKm(a, b) {
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const round10 = (n) => Math.round(n / 10) * 10;

// Indicative round-trip fares per person in USD. Sample figures for the design: replace with real fare data.
const CABIN_FACTOR = { business: 1, first: 1.75, premium: 0.45 };
function fareFor(fromCode, toCode, { cabin = 'business', oneWay = false } = {}) {
  const a = BY_CODE[fromCode], b = BY_CODE[toCode];
  if (!a || !b || a.code === b.code) return null;
  const d = distanceKm(a, b);
  const key = [a.code, b.code].sort().join('');
  const published = (1600 + 0.42 * d) * (0.95 + (hash(key) % 11) / 100) * CABIN_FACTOR[cabin] * (oneWay ? 0.65 : 1);
  const ours = published * (0.6 + (hash(key + 'x') % 9) / 100);
  return { published: round10(published), ours: round10(ours), saving: Math.round((1 - ours / published) * 100) };
}

/* ---------- small helpers ---------- */
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
const shortDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

/* ---------- state ---------- */
const form = $('#quote');
const state = {
  trip: 'round', from: null, to: null, depart: null, ret: null,
  legs: [], // extra legs for multi-city: { from, to, date }
};

/* ---------- airport search ---------- */
function searchAirports(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const scored = [];
  for (const a of AIRPORTS) {
    const code = a.code.toLowerCase(), city = a.city.toLowerCase(), country = a.country.toLowerCase();
    let s = 0;
    if (code === q) s = 100;
    else if (city.startsWith(q)) s = 80;
    else if (code.startsWith(q)) s = 70;
    else if (city.split(/[\s(,-]+/).some((w) => w.startsWith(q))) s = 60;
    else if (country.startsWith(q)) s = 40;
    else if (city.includes(q)) s = 30;
    if (s) scored.push([s, a]);
  }
  return scored.sort((x, y) => y[0] - x[0] || x[1].city.localeCompare(y[1].city)).slice(0, 7).map((x) => x[1]);
}

// Turns a text input into a combobox. onPick(airport) is called with the chosen airport.
function airportField(input, onPick) {
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
      li.innerHTML = `<span class="suggest__code">${a.code}</span><span class="suggest__city">${a.city}<span class="suggest__country">${a.country}</span></span>`;
      li.addEventListener('pointerdown', (e) => { e.preventDefault(); pick(a); });
      list.append(li);
    });
    list.hidden = !items.length;
    input.setAttribute('aria-expanded', String(!!items.length));
    if (active >= 0) input.setAttribute('aria-activedescendant', `${list.id}-${active}`);
  };
  const pick = (a) => { input.value = label(a); close(); onPick(a); };

  input.addEventListener('input', () => { items = searchAirports(input.value); active = items.length ? 0 : -1; render(); });
  input.addEventListener('focus', () => { input.select(); });
  input.addEventListener('keydown', (e) => {
    if (list.hidden && e.key === 'ArrowDown') { items = searchAirports(input.value); active = 0; render(); return; }
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { active = Math.min(items.length - 1, active + 1); render(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { active = Math.max(0, active - 1); render(); e.preventDefault(); }
    else if (e.key === 'Enter' && active >= 0) { pick(items[active]); e.preventDefault(); }
    else if (e.key === 'Escape') close();
  });
  input.addEventListener('blur', () => {
    // A typed code or exact city that was never picked from the list still counts.
    if (!list.hidden && items.length && input.value.trim().length >= 3 && items[0]) {
      const q = input.value.trim().toLowerCase();
      if (items[0].code.toLowerCase() === q || items[0].city.toLowerCase() === q) pick(items[0]);
    }
    close();
  });
  return { set(a) { input.value = label(a); } };
}

/* ---------- calendar ---------- */
const cal = {
  el: $('#cal'), months: $('#cal-months'), title: $('#cal-title'),
  view: null, mode: 'depart', target: null, // target: 'main' or a leg index
  open(mode, target = 'main') {
    this.mode = mode; this.target = target;
    const sel = this.current();
    const base = sel || (this.mode === 'return' && state.depart) || startOfDay(new Date());
    this.view = new Date(base.getFullYear(), base.getMonth(), 1);
    this.render();
    this.el.hidden = false;
    document.documentElement.classList.add('cal-open');
    requestAnimationFrame(() => this.el.classList.add('is-open'));
    ($('.day.is-start, .day.is-end', this.months) || $('.day:not([disabled])', this.months))?.focus();
  },
  close() {
    this.el.classList.remove('is-open');
    this.el.hidden = true;
    document.documentElement.classList.remove('cal-open');
    const back = this.target === 'main' ? (this.mode === 'return' ? $('#ret') : $('#depart')) : $(`#leg${this.target}-date`);
    back?.focus();
  },
  current() {
    if (this.target !== 'main') return state.legs[this.target]?.date || null;
    return this.mode === 'return' ? state.ret : state.depart;
  },
  render() {
    const wide = matchMedia('(min-width: 34rem)').matches;
    const count = wide ? 2 : 1;
    const today = startOfDay(new Date());
    const minDate = this.target !== 'main' ? (state.legs[this.target - 1]?.date || state.depart || today) : (this.mode === 'return' && state.depart ? state.depart : today);
    this.title.textContent = this.target !== 'main' ? `Flight ${Number(this.target) + 2}: choose a date` : this.mode === 'return' ? 'Choose your return' : state.trip === 'round' ? 'Choose departure, then return' : 'Choose departure';
    this.months.innerHTML = '';
    for (let m = 0; m < count; m++) {
      const first = new Date(this.view.getFullYear(), this.view.getMonth() + m, 1);
      const wrap = document.createElement('div');
      wrap.className = 'month';
      wrap.innerHTML = `<p class="month__name">${first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>`;
      const grid = document.createElement('div');
      grid.className = 'month__grid';
      grid.setAttribute('role', 'grid');
      ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].forEach((d) => { const s = document.createElement('span'); s.className = 'dow'; s.textContent = d; s.setAttribute('aria-hidden', 'true'); grid.append(s); });
      const offset = (first.getDay() + 6) % 7;
      for (let i = 0; i < offset; i++) grid.append(document.createElement('span'));
      const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      for (let d = 1; d <= days; d++) {
        const date = new Date(first.getFullYear(), first.getMonth(), d);
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'day';
        b.textContent = d;
        b.dataset.date = iso(date);
        b.setAttribute('aria-label', date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
        if (date < minDate) b.disabled = true;
        const t = +date;
        if (this.target === 'main') {
          if (state.depart && t === +state.depart) b.classList.add('is-start');
          if (state.ret && t === +state.ret) b.classList.add('is-end');
          if (state.depart && state.ret && t > +state.depart && t < +state.ret) b.classList.add('is-between');
        } else if (state.legs[this.target]?.date && t === +state.legs[this.target].date) b.classList.add('is-start');
        if (t === +today) b.classList.add('is-today');
        grid.append(b);
      }
      wrap.append(grid);
      this.months.append(wrap);
    }
    $('#cal-prev').disabled = this.view <= new Date(today.getFullYear(), today.getMonth(), 1);
  },
  choose(date) {
    if (this.target !== 'main') {
      state.legs[this.target].date = date;
      renderLegs(); sync(); this.close(); return;
    }
    if (this.mode === 'depart') {
      state.depart = date;
      if (state.ret && state.ret < date) state.ret = null;
      if (state.trip === 'round') { this.mode = 'return'; this.render(); this.title.textContent = 'Now choose your return'; sync(); return; }
    } else {
      if (state.depart && date < state.depart) { state.depart = date; this.render(); sync(); return; }
      state.ret = date;
    }
    sync(); this.close();
  },
};

/* ---------- panel ---------- */
const fromField = airportField($('#from'), (a) => { state.from = a; sync(); renderRoutes(); });
const toField = airportField($('#to'), (a) => { state.to = a; sync(); });

function setTrip(trip) {
  state.trip = trip;
  form.dataset.trip = trip;
  const r = $(`input[name="trip"][value="${trip}"]`);
  if (r) r.checked = true;
  if (trip === 'oneway') state.ret = null;
  if (trip === 'multi' && !state.legs.length) state.legs.push({ from: state.to, to: null, date: null });
  renderLegs(); sync();
}

function renderLegs() {
  const box = $('#legs');
  box.innerHTML = '';
  if (state.trip !== 'multi') return;
  state.legs.forEach((leg, i) => {
    const row = document.createElement('div');
    row.className = 'leg';
    row.innerHTML = `
      <div class="fld"><label for="leg${i}-from">From</label><input id="leg${i}-from" name="leg${i + 2}_from" type="text" autocomplete="off" placeholder="City or airport" value="${label(leg.from)}"></div>
      <div class="fld"><label for="leg${i}-to">To</label><input id="leg${i}-to" name="leg${i + 2}_to" type="text" autocomplete="off" placeholder="City or airport" value="${label(leg.to)}"></div>
      <div class="fld fld--date"><label for="leg${i}-date">Date</label><input id="leg${i}-date" name="leg${i + 2}_date" type="text" readonly placeholder="Choose" value="${leg.date ? shortDate(leg.date) : ''}"></div>
      <button type="button" class="leg__remove" aria-label="Remove flight ${i + 2}">Remove</button>`;
    box.append(row);
    airportField($(`#leg${i}-from`, row), (a) => { leg.from = a; sync(); });
    airportField($(`#leg${i}-to`, row), (a) => { leg.to = a; sync(); });
    const date = $(`#leg${i}-date`, row);
    date.addEventListener('click', () => cal.open('depart', i));
    date.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cal.open('depart', i); } });
    $('.leg__remove', row).addEventListener('click', () => { state.legs.splice(i, 1); if (!state.legs.length) setTrip('round'); else { renderLegs(); sync(); } });
  });
  if (state.legs.length < 3) {
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'textbtn';
    add.textContent = '+ Add another flight';
    add.addEventListener('click', () => { const last = state.legs[state.legs.length - 1]; state.legs.push({ from: last?.to || null, to: null, date: null }); renderLegs(); $(`#leg${state.legs.length - 1}-${state.legs[state.legs.length - 1].from ? 'to' : 'from'}`)?.focus(); });
    box.append(add);
  }
}

function renderChips() {
  const box = $('#chips');
  const origin = state.from;
  const pool = ['LHR', 'CDG', 'FCO', 'DXB', 'HND', 'SIN', 'JFK', 'LAX', 'CPT', 'SYD', 'MLE'];
  const picks = pool.filter((c) => !origin || (c !== origin.code && distanceKm(origin, BY_CODE[c]) > 2500)).slice(0, 5);
  box.innerHTML = '';
  picks.forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = BY_CODE[c].city;
    b.setAttribute('aria-pressed', String(state.to?.code === c));
    b.addEventListener('click', () => { state.to = BY_CODE[c]; toField.set(state.to); sync(); if (!state.depart) $('#depart').focus(); });
    box.append(b);
  });
}

// The destination photo is only fetched once that destination is chosen, then cross-faded in.
function stagePhoto() {
  const f = state.to && FEATURED_BY_CODE[state.to.code];
  const box = $('.stage__photo');
  let img = f && $(`.stage__img[data-dest="${f.code}"]`, box);
  if (f && !img) {
    img = document.createElement('img');
    Object.assign(img, { className: 'stage__img', alt: '', decoding: 'async', src: f.img });
    img.dataset.dest = f.code;
    box.append(img);
  }
  if (img && !img.complete) { img.addEventListener('load', stagePhoto, { once: true }); return; }
  $$('.stage__img[data-dest]', box).forEach((i) => i.classList.toggle('is-on', i === img));
  $('.stage__img--base')?.classList.toggle('is-off', !!img);
}

function fareLine() {
  const out = $('#fare');
  const cabin = $('#cabin').value;
  const f = state.from && state.to && fareFor(state.from.code, state.to.code, { cabin, oneWay: state.trip === 'oneway' });
  if (!f) { out.dataset.state = 'empty'; out.innerHTML = '<span class="fare__hint">Choose where you fly from and to, and the typical fare for that route shows here.</span>'; return; }
  out.dataset.state = 'full';
  const cab = { business: 'business', first: 'first class', premium: 'premium economy' }[cabin];
  out.innerHTML = `
    <span class="fare__route">${state.from.code} to ${state.to.code}, ${{ oneway: 'one way', round: 'round trip', multi: 'first flight' }[state.trip]} in ${cab}</span>
    <span class="fare__pair"><span class="fare__pub">Published from <s>${USD.format(f.published)}</s></span>
    <span class="fare__ours">With us from about <strong>${USD.format(f.ours)}</strong></span></span>`;
  out.classList.remove('is-new'); void out.offsetWidth; out.classList.add('is-new');
}

function clearErr(id) {
  const el = $(`#err-${id}`);
  if (el) el.textContent = '';
  $(`#${id}`)?.closest('.fld')?.classList.remove('has-error');
}

function sync() {
  if (state.from) fromField.set(state.from);
  if (state.to) toField.set(state.to);
  $('#from-code').value = state.from?.code || '';
  $('#to-code').value = state.to?.code || '';
  $('#depart').value = state.depart ? shortDate(state.depart) : '';
  $('#ret').value = state.ret ? shortDate(state.ret) : '';
  $('#depart-iso').value = state.depart ? iso(state.depart) : '';
  $('#ret-iso').value = state.ret ? iso(state.ret) : '';
  renderChips(); fareLine(); stagePhoto();
  if (state.from) clearErr('from');
  if (state.to) clearErr('to');
  if (state.depart || $('#later').checked) clearErr('depart');
  store.set({
    trip: state.trip, from: state.from?.code, to: state.to?.code,
    depart: state.depart && iso(state.depart), ret: state.ret && iso(state.ret),
    legs: state.legs.map((l) => ({ from: l.from?.code, to: l.to?.code, date: l.date && iso(l.date) })),
    pax: $('#pax').value, cabin: $('#cabin').value, flex: $('#flex').checked,
  });
}

/* ---------- origin ---------- */
function detectOrigin() {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch {}
  return BY_CODE[(window.TZ_HUBS || {})[tz]] || BY_CODE[CONFIG.fallbackOrigin];
}
function nearestAirport(lat, lon) {
  let best = null, bestD = Infinity;
  for (const a of AIRPORTS) { const d = distanceKm({ lat, lon }, a); if (d < bestD) { bestD = d; best = a; } }
  return best;
}

/* ---------- routes on the page ---------- */
let featuredIndex = 0;
function renderShowcase() {
  const origin = state.from || BY_CODE[CONFIG.fallbackOrigin];
  const list = FEATURED.filter((f) => f.code !== origin.code && distanceKm(origin, BY_CODE[f.code]) > 1500);
  const tabs = $('#sc-tabs');
  if (!tabs || !list.length) return;
  featuredIndex = Math.min(featuredIndex, list.length - 1);
  tabs.innerHTML = '';
  list.forEach((f, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.className = 'tab';
    b.id = `sc-tab-${f.code}`;
    b.setAttribute('aria-controls', 'sc-panel');
    b.setAttribute('aria-selected', String(i === featuredIndex));
    b.tabIndex = i === featuredIndex ? 0 : -1;
    b.textContent = BY_CODE[f.code].city;
    b.addEventListener('click', () => { featuredIndex = i; renderShowcase(); $(`#sc-tab-${f.code}`).focus(); });
    b.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      featuredIndex = (i + step + list.length) % list.length; renderShowcase(); $(`#sc-tab-${list[featuredIndex].code}`).focus();
    });
    tabs.append(b);
  });
  const f = list[featuredIndex], dest = BY_CODE[f.code];
  const fare = fareFor(origin.code, f.code);
  const img = $('#sc-img');
  if (img.getAttribute('src') !== f.img) {
    img.classList.remove('is-in');
    img.src = f.img; img.alt = f.alt;
    img.decode?.().catch(() => {}).finally(() => img.classList.add('is-in'));
  }
  $('#sc-panel').setAttribute('aria-labelledby', `sc-tab-${f.code}`);
  $('#sc-title').textContent = `${origin.city} to ${dest.city}`;
  $('#sc-note').textContent = f.note;
  $('#sc-pub').textContent = USD.format(fare.published);
  $('#sc-ours').textContent = USD.format(fare.ours);
  $('#sc-carriers').textContent = f.carriers;
  $('#sc-fill').onclick = () => fillRoute(origin, dest);
}

const GROUPS = [
  ['Europe', ['LHR', 'CDG', 'FCO', 'FRA', 'AMS', 'ATH', 'IST', 'LIS', 'ZRH']],
  ['Middle East and Africa', ['DXB', 'DOH', 'TLV', 'CAI', 'NBO', 'JNB', 'CPT']],
  ['Asia and the Pacific', ['HND', 'SIN', 'HKG', 'ICN', 'BKK', 'DEL', 'MLE', 'SYD', 'AKL']],
  ['The Americas', ['JFK', 'MIA', 'LAX', 'YVR', 'MEX', 'GRU', 'EZE', 'HNL']],
];
function renderFares() {
  const origin = state.from || BY_CODE[CONFIG.fallbackOrigin];
  const box = $('#fare-groups');
  if (!box) return;
  $$('[data-origin-city]').forEach((el) => { el.textContent = origin.city; });
  box.innerHTML = '';
  for (const [name, codes] of GROUPS) {
    const rows = codes.filter((c) => c !== origin.code && distanceKm(origin, BY_CODE[c]) > 2500).slice(0, 4);
    if (!rows.length) continue;
    const g = document.createElement('div');
    g.className = 'fare-group';
    g.innerHTML = `<h3 class="fare-group__name">${name}</h3>`;
    const ul = document.createElement('ul');
    ul.className = 'fare-rows';
    rows.forEach((c) => {
      const d = BY_CODE[c], f = fareFor(origin.code, c);
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" class="fare-row">
        <span class="fare-row__name">${d.city}</span>
        <span class="fare-row__price">${USD.format(f.ours)}</span>
        <span class="fare-row__meta">${d.code} · published from ${USD.format(f.published)} · about ${f.saving}% less</span>
      </button>`;
      $('button', li).addEventListener('click', () => fillRoute(origin, d));
      ul.append(li);
    });
    g.append(ul);
    box.append(g);
  }
}

function renderRoutes() { renderShowcase(); renderFares(); }

// Fill the panel with a route chosen elsewhere on the page and bring the panel into view.
function fillRoute(from, to) {
  if (state.trip === 'multi') setTrip('round');
  state.from = from; state.to = to;
  sync(); renderRoutes();
  const panel = $('.panel');
  const pinned = getComputedStyle($('.stage')).position === 'sticky';
  if (!pinned) panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  panel.classList.remove('is-flash'); void panel.offsetWidth; panel.classList.add('is-flash');
  setTimeout(() => (state.depart ? $('#name') : $('#depart')).focus({ preventScroll: !pinned ? false : true }), pinned ? 0 : 450);
}

/* ---------- submit ---------- */
function validate() {
  const errors = {};
  if (!state.from) errors.from = 'Choose where you fly from.';
  if (!state.to) errors.to = 'Choose where you fly to.';
  if (state.from && state.to && state.from.code === state.to.code) errors.to = 'Choose a different destination.';
  if (!state.depart && !$('#later').checked) errors.depart = 'Choose a date, or tick “I’ll decide dates with my advisor”.';
  if (!$('#name').value.trim()) errors.name = 'Tell us your name.';
  const c = $('#contact').value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
  const isPhone = c.replace(/\D/g, '').length >= 7 && /^[+\d\s().-]+$/.test(c);
  if (!isEmail && !isPhone) errors.contact = 'Add an email address or a phone number.';
  $$('.fld', form).forEach((f) => f.classList.remove('has-error'));
  $$('.err', form).forEach((e) => { e.textContent = ''; });
  for (const [k, msg] of Object.entries(errors)) {
    const el = $(`#err-${k}`);
    if (el) el.textContent = msg;
    $(`#${k === 'depart' ? 'depart' : k}`)?.closest('.fld')?.classList.add('has-error');
  }
  return errors;
}

async function submit(e) {
  e.preventDefault();
  if ($('#hp').value) return; // honeypot
  const errors = validate();
  const first = Object.keys(errors)[0];
  if (first) { $(`#${first}`)?.focus(); return; }
  const lead = {
    trip: state.trip, from: state.from.code, to: state.to.code,
    depart: state.depart ? iso(state.depart) : null, return: state.ret ? iso(state.ret) : null,
    legs: state.legs.map((l) => ({ from: l.from?.code || null, to: l.to?.code || null, date: l.date ? iso(l.date) : null })),
    flexible: $('#flex').checked, datesLater: $('#later').checked,
    passengers: Number($('#pax').value), cabin: $('#cabin').value,
    name: $('#name').value.trim(), contact: $('#contact').value.trim(),
    indicative: fareFor(state.from.code, state.to.code, { cabin: $('#cabin').value, oneWay: state.trip === 'oneway' }),
    page: location.href, at: new Date().toISOString(),
  };
  const btn = $('#send');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    if (CONFIG.leadEndpoint) {
      const res = await fetch(CONFIG.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error('Request failed');
    } else {
      console.info('[BusinessClassTravel] Quote request (stub — no endpoint configured):', lead);
    }
    const when = lead.depart ? `${shortDate(state.depart)}${state.ret ? ` to ${shortDate(state.ret)}` : ''}` : 'dates to agree';
    $('#done-text').textContent = `${lead.name.split(' ')[0]}, your request for ${state.from.city} to ${state.to.city} (${when}) is with an advisor. Expect your fares at ${lead.contact}, usually within the hour.`;
    form.classList.add('is-done');
    $('#done').hidden = false;
    $('#done h2').focus();
  } catch {
    $('#err-send').textContent = `That didn’t go through. Please try again, or call ${CONFIG.phone}.`;
  } finally {
    btn.disabled = false; btn.textContent = 'Get my fare';
  }
}

/* ---------- start ---------- */
function init() {
  // Swap the native date inputs for the calendar.
  for (const id of ['depart', 'ret']) {
    const input = $(`#${id}`);
    input.type = 'text';
    input.readOnly = true;
    input.removeAttribute('name');
    input.placeholder = id === 'depart' ? 'Choose a date' : 'Choose a date';
    input.addEventListener('click', () => cal.open(id === 'ret' ? 'return' : 'depart'));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); cal.open(id === 'ret' ? 'return' : 'depart'); } });
  }
  $('#add-return').addEventListener('click', () => { setTrip('round'); cal.open('return'); });
  $('#cal-close').addEventListener('click', () => cal.close());
  $('#cal-done').addEventListener('click', () => cal.close());
  $('#cal-prev').addEventListener('click', () => { cal.view.setMonth(cal.view.getMonth() - 1); cal.render(); });
  $('#cal-next').addEventListener('click', () => { cal.view.setMonth(cal.view.getMonth() + 1); cal.render(); });
  $('#cal-months').addEventListener('click', (e) => { const b = e.target.closest('.day'); if (b && !b.disabled) cal.choose(fromIso(b.dataset.date)); });
  $('#cal-months').addEventListener('keydown', (e) => {
    const b = e.target.closest('.day'); if (!b) return;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = new Date(+fromIso(b.dataset.date) + step * DAY);
    let el = $(`.day[data-date="${iso(next)}"]`, cal.months);
    if (!el) { cal.view.setMonth(cal.view.getMonth() + (step > 0 ? 1 : -1)); cal.render(); el = $(`.day[data-date="${iso(next)}"]`, cal.months); }
    el?.focus();
  });
  cal.el.addEventListener('keydown', (e) => { if (e.key === 'Escape') cal.close(); });
  cal.el.addEventListener('click', (e) => { if (e.target === cal.el) cal.close(); });
  $$('[data-quick]').forEach((b) => b.addEventListener('click', () => {
    const now = startOfDay(new Date());
    if (b.dataset.quick === 'next-month') {
      const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      while (d.getDay() !== 4) d.setDate(d.getDate() + 1); // first Thursday next month
      if (cal.target === 'main') { state.depart = d; if (state.trip === 'round') state.ret = new Date(+d + 7 * DAY); }
      else state.legs[cal.target].date = d;
    } else if (b.dataset.quick === 'two-weeks') {
      const d = new Date(+now + 14 * DAY);
      if (cal.target === 'main') { state.depart = d; if (state.trip === 'round') state.ret = new Date(+d + 7 * DAY); }
      else state.legs[cal.target].date = d;
    } else if (b.dataset.quick === 'later') {
      $('#later').checked = true; state.depart = null; state.ret = null;
    }
    renderLegs(); sync(); cal.close();
  }));

  $$('input[name="trip"]').forEach((r) => r.addEventListener('change', () => setTrip(r.value)));
  $('#swap').addEventListener('click', () => {
    [state.from, state.to] = [state.to, state.from];
    $('#from').value = label(state.from); $('#to').value = label(state.to);
    $('#swap').classList.toggle('is-turned');
    sync(); renderRoutes();
  });
  $('#locate')?.addEventListener('click', () => {
    if (!navigator.geolocation) return;
    $('#locate').textContent = 'Finding you…';
    navigator.geolocation.getCurrentPosition(
      (p) => { state.from = nearestAirport(p.coords.latitude, p.coords.longitude); sync(); renderRoutes(); $('#locate').textContent = 'Use my location'; },
      () => { $('#locate').textContent = 'Location unavailable'; },
      { timeout: 8000, maximumAge: 600000 },
    );
  });
  ['pax', 'cabin', 'flex', 'later'].forEach((id) => $(`#${id}`).addEventListener('change', sync));
  form.addEventListener('submit', submit);
  $('#again').addEventListener('click', () => { form.classList.remove('is-done'); $('#done').hidden = true; $('#from').focus(); });
  ['name', 'contact'].forEach((id) => $(`#${id}`).addEventListener('input', () => clearErr(id)));

  // Restore the last request, or start from the visitor's nearest hub.
  const saved = store.get();
  state.from = (saved && BY_CODE[saved.from]) || detectOrigin();
  if (saved) {
    state.to = BY_CODE[saved.to] || null;
    const today = startOfDay(new Date());
    state.depart = fromIso(saved.depart); if (state.depart && state.depart < today) state.depart = null;
    state.ret = state.depart ? fromIso(saved.ret) : null;
    state.legs = (saved.legs || []).map((l) => ({ from: BY_CODE[l.from] || null, to: BY_CODE[l.to] || null, date: fromIso(l.date) }));
    if (saved.pax) $('#pax').value = saved.pax;
    if (saved.cabin) $('#cabin').value = saved.cabin;
    $('#flex').checked = saved.flex !== false;
  }
  setTrip(saved?.trip || 'round');
  renderRoutes();

  // On phones the panel scrolls away: a bar brings it back.
  const dock = $('#dock');
  if ('IntersectionObserver' in window && dock) {
    const io = new IntersectionObserver(([en]) => { dock.classList.toggle('is-shown', !en.isIntersecting && en.boundingClientRect.top < 0); }, { threshold: 0 });
    io.observe($('.panel'));
  }
  $('#dock-quote')?.addEventListener('click', () => { $('.panel').scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => $('#from').focus({ preventScroll: true }), 500); });
  $$('[data-to-panel]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const pinned = getComputedStyle($('.stage')).position === 'sticky';
    if (pinned) window.scrollTo({ top: 0, behavior: 'smooth' });
    else $('.panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => $(state.from && state.to ? (state.depart ? '#name' : '#depart') : '#to').focus({ preventScroll: true }), 600);
  }));
}

if (form) init();
