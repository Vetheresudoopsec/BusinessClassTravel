/* Business Class Travel — the booking card, the fare list and the two smaller forms.
   No framework. Without this file every form still posts to quote.php with plain fields. */

const CONFIG = {
  // Where requests go. Empty = stub: the request is confirmed on the page and logged to the console.
  // To go live on HostGator, set a recipient in quote.php and change this to 'quote.php'.
  leadEndpoint: '',
  phone: '[PHONE]',
  fallbackOrigin: 'HKG',
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
    const code = a.code.toLowerCase(), city = a.city.toLowerCase(), country = a.country.toLowerCase();
    let s = 0;
    if (code === q) s = 100;
    else if (city.startsWith(q)) s = 80;
    else if (code.startsWith(q)) s = 70;
    else if (city.split(/[\s(,'-]+/).some((w) => w.startsWith(q))) s = 60;
    else if (country.startsWith(q)) s = 40;
    else if (city.includes(q)) s = 30;
    if (s) scored.push([s, a]);
  }
  return scored.sort((x, y) => y[0] - x[0] || x[1].city.localeCompare(y[1].city)).slice(0, 6).map((x) => x[1]);
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
      li.innerHTML = `<span class="suggest__code">${a.code}</span><span>${a.city}<span class="suggest__country">${a.country}</span></span>`;
      // Commit on press, so the list never closes under the finger before the choice lands.
      li.addEventListener('pointerdown', (e) => { e.preventDefault(); pick(a); });
      list.append(li);
    });
    list.hidden = !items.length;
    input.setAttribute('aria-expanded', String(!!items.length));
    if (active >= 0) input.setAttribute('aria-activedescendant', `${list.id}-${active}`);
  };
  const pick = (a) => { input.value = label(a); close(); onPick(a); };

  input.addEventListener('input', () => { items = searchAirports(input.value); active = items.length ? 0 : -1; render(); });
  input.addEventListener('focus', () => input.select());
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

/* ---------- booking card ---------- */
const fromField = airportField($('#from'), (a) => { state.from = a; sync(); if (!state.to) $('#to').focus(); });
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
  store.set({ trip: state.trip, from: state.from?.code, to: state.to?.code, depart: state.depart && iso(state.depart), ret: state.ret && iso(state.ret), pax: $('#pax').value, cabin: $('#cabin').value, flex: $('#flex').checked });
}

function detectOrigin() {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch {}
  return BY_CODE[(window.TZ_HUBS || {})[tz]] || BY_CODE[CONFIG.fallbackOrigin];
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v) => v.replace(/\D/g, '').length >= 7 && /^[+\d\s().-]+$/.test(v);

function validate() {
  const errors = {};
  if (!state.from) errors.from = 'Please choose where you are flying from.';
  if (!state.to) errors.to = 'Please choose where you are flying to.';
  if (state.from && state.to && state.from.code === state.to.code) errors.to = 'Please choose a different destination.';
  if (!state.depart && !$('#flex').checked) errors.depart = 'Please add a date, or mark your dates as flexible.';
  if (!$('#name').value.trim()) errors.name = 'Please add your name.';
  const email = $('#email').value.trim(), phone = $('#phone').value.trim();
  if (!isEmail(email)) errors.email = email ? 'Please check your email address.' : 'Please add your email address.';
  if (phone && !isPhone(phone)) errors.phone = 'Please check your phone number, including the country code.';
  ['from', 'to', 'depart', 'name', 'email', 'phone'].forEach(clearErr);
  for (const [k, msg] of Object.entries(errors)) showErr(k, msg);
  return errors;
}

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
  if (first) { if (first === 'depart') cal.open('depart'); else $(`#${first}`).focus(); return; }
  const lead = {
    type: 'booking', trip: state.trip, from: state.from.code, to: state.to.code,
    depart: state.depart ? iso(state.depart) : null, return: state.ret ? iso(state.ret) : null,
    flexible: $('#flex').checked, legs: state.trip === 'multi' ? $('#legs').value.trim() : '',
    passengers: Number($('#pax').value), cabin: $('#cabin').value,
    name: $('#name').value.trim(), email: $('#email').value.trim(), phone: $('#phone').value.trim(),
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
  state.from = a; state.to = b;
  fromField.set(a); toField.set(b);
  if (link.dataset.cabin) $('#cabin').value = link.dataset.cabin;
  form.classList.remove('is-done'); $('#done').hidden = true;
  sync();
  $('#quote').scrollIntoView({ behavior: Spring.reduced.matches ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => $('#depart').focus({ preventScroll: true }), Spring.reduced.matches ? 0 : 450);
}

/* ---------- fare list ---------- */
function initFares() {
  const rows = $$('#fare-rows tr');
  if (!rows.length) return;
  const fill = (select, key) => {
    const seen = new Map();
    rows.forEach((r) => seen.set(r.dataset[key], r.dataset[key + 'City']));
    [...seen].sort((x, y) => x[1].localeCompare(y[1])).forEach(([code, city]) => select.add(new Option(`${city} (${code})`, code)));
  };
  fill($('#f-from'), 'from');
  fill($('#f-to'), 'to');
  const apply = () => {
    const f = $('#f-from').value, t = $('#f-to').value;
    const budget = Number($('#f-budget').value.replace(/[^\d.]/g, '')) || 0;
    let shown = 0;
    rows.forEach((r) => {
      const price = Number(r.dataset.price) || 0; // rows without a price yet are never hidden by the budget
      const ok = (!f || r.dataset.from === f) && (!t || r.dataset.to === t) && (!budget || !price || price <= budget);
      r.hidden = !ok;
      if (ok) shown++;
    });
    $('#fares-empty').hidden = shown > 0;
  };
  ['f-from', 'f-to'].forEach((id) => $(`#${id}`).addEventListener('change', apply));
  $('#f-budget').addEventListener('input', apply);
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
  ['pax', 'cabin', 'flex'].forEach((id) => $(`#${id}`).addEventListener('change', sync));
  ['name', 'email', 'phone'].forEach((id) => $(`#${id}`).addEventListener('input', () => clearErr(id)));
  form.addEventListener('submit', submit);
  $('#again').addEventListener('click', () => { form.classList.remove('is-done'); $('#done').hidden = true; $('#to').focus(); });
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-from][data-to]');
    if (link) { e.preventDefault(); useRoute(link); }
  });

  // Restore an earlier request, or start from the visitor's nearest hub.
  const saved = store.get();
  state.from = (saved && BY_CODE[saved.from]) || detectOrigin();
  if (saved) {
    state.to = BY_CODE[saved.to] || null;
    const today = startOfDay(new Date());
    state.depart = fromIso(saved.depart); if (state.depart && state.depart < today) state.depart = null;
    state.ret = state.depart ? fromIso(saved.ret) : null;
    if (saved.pax) $('#pax').value = saved.pax;
    if (saved.cabin === 'business' || saved.cabin === 'first') $('#cabin').value = saved.cabin;
    $('#flex').checked = !!saved.flex;
  }
  fromField.set(state.from);
  if (state.to) toField.set(state.to);
  setTrip(['oneway', 'multi'].includes(saved?.trip) ? saved.trip : 'round');

  initFares();
  smallForm($('#corp-form'), () => checkFields([
    ['c-company', (v) => v, 'Please add your company name.'],
    ['c-email', isEmail, 'Please add a work email address.'],
  ]), () => ({ type: 'corporate', company: $('#c-company').value.trim(), email: $('#c-email').value.trim(), travellers: $('#c-size').value }));
  smallForm($('#enquire-form'), () => checkFields([
    ['e-name', (v) => v, 'Please add your name.'],
    ['e-contact', (v) => isEmail(v) || isPhone(v), 'Please add an email address or a phone number.'],
  ]), () => ({ type: 'enquiry', name: $('#e-name').value.trim(), contact: $('#e-contact').value.trim(), itinerary: $('#e-trip').value.trim() }));
}

if (form) init();
