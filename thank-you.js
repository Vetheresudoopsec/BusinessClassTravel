// Thank-you page: shows the request just sent (saved by app.js for this tab only), takes extra details,
// and lets the visitor correct their email or the request. Each change is emailed to the consultant.
(() => {
  const $ = (sel) => document.querySelector(sel);
  let q = null;
  try { q = JSON.parse(sessionStorage.getItem('bct-last-quote') || 'null'); } catch {}

  // No request in this tab (opened directly, or after a request sent without JavaScript): a plain thank-you.
  if (!q) { $('#again').hidden = false; return; }

  const store = () => { try { sessionStorage.setItem('bct-last-quote', JSON.stringify(q)); } catch {} };
  const day = (v) => {
    const d = v ? new Date(`${v}T00:00:00`) : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '') : '';
  };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const place = (city, code) => (code && code !== city ? `${city} (${code})` : city);
  const text = {
    route: () => `${place(q.fromCity, q.from)} to ${place(q.toCity, q.to)}`,
    dates: () => {
      const depart = day(q.depart), ret = day(q.return);
      let d = depart && ret && q.trip !== 'oneway' ? `${depart} to ${ret}` : depart || 'To be agreed';
      if (q.trip === 'oneway' && depart) d = `${depart}, one way`;
      return q.flexible ? `${d} (± 3 days)` : d;
    },
    cabin: () => (q.cabin === 'first' ? 'First Class' : 'Business Class'),
    pax: () => plural(q.adults, 'adult', 'adults') + (q.children ? `, ${plural(q.children, 'child', 'children')}` : ''),
  };

  // Sends a note to the consultant. Throws with a message the visitor can read.
  const send = async (details, email = q.email) => {
    let res, body = {};
    try {
      res = await fetch('quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: 'details', name: q.name, email, route: `${q.from} to ${q.to}`, details, page: location.href }),
      });
      body = await res.json().catch(() => ({}));
    } catch {}
    if (!res || !res.ok) throw new Error(body.message || 'This could not be sent. Please try again, or call us on 305-244-6463.');
  };

  const pencil = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';

  const render = () => {
    if (q.firstName) $('#thanks-title').textContent = `Thank You for Your Request, ${q.firstName}`;
    const lead = $('#thanks-text');
    lead.textContent = 'A consultant is preparing fares for your journey. You will hear from us within 24 hours';
    if (q.email) {
      const email = document.createElement('span');
      email.className = 'email';
      email.textContent = q.email;
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'pencil';
      edit.id = 'edit-email';
      edit.setAttribute('aria-label', 'Change your email address');
      edit.innerHTML = pencil;
      edit.addEventListener('click', openEmail);
      lead.append(', at ', email, '.', edit);
    } else lead.append('.');
    $('#sum-route').textContent = text.route();
    $('#sum-dates').textContent = text.dates();
    $('#sum-cabin').textContent = text.cabin();
    $('#sum-pax').textContent = text.pax();
  };

  // --- Email: pencil opens a small form under the sentence.
  const emailForm = $('#email-form'), emailInput = $('#email-input'), emailErr = $('#err-email');
  function openEmail() {
    $('#email-note').textContent = '';
    emailInput.value = q.email || '';
    emailErr.textContent = '';
    emailForm.hidden = false;
    emailInput.focus();
    emailInput.select();
  }
  const closeEmail = () => { emailForm.hidden = true; $('#edit-email')?.focus(); };
  $('#email-cancel').addEventListener('click', closeEmail);
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const next = emailInput.value.trim();
    if (!next || !emailInput.checkValidity()) { emailErr.textContent = 'Please enter a valid email address.'; emailInput.focus(); return; }
    if (next.toLowerCase() === (q.email || '').toLowerCase()) { closeEmail(); return; }
    const btn = emailForm.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      await send(`The customer changed their email address from ${q.email} to ${next}. Please reply to the new address.`, next);
      q.email = next; store(); render();
      emailForm.hidden = true;
      $('#email-note').textContent = 'Saved. We’ve let your consultant know.';
      $('#edit-email').focus();
    } catch (err) {
      emailErr.textContent = err.message;
    } finally {
      btn.disabled = false; btn.textContent = 'Save';
    }
  });

  // --- Request: Edit swaps the summary for a form; Save emails what changed.
  const form = $('#request-form'), reqErr = $('#err-request'), editBtn = $('#edit-request');
  const f = (id) => $(`#ed-${id}`);
  const parsePlace = (v) => {
    const m = v.match(/^(.*?)\s*\(([A-Za-z]{3})\)\s*$/);
    return m ? [m[1].trim(), m[2].toUpperCase()] : [v, v];
  };
  const openRequest = () => {
    f('from').value = place(q.fromCity, q.from);
    f('to').value = place(q.toCity, q.to);
    f('depart').value = q.depart || '';
    f('return').value = q.return || '';
    f('depart').min = f('return').min = new Date().toISOString().slice(0, 10);
    $('#ed-return-wrap').hidden = q.trip === 'oneway';
    f('flex').checked = !!q.flexible;
    f('cabin').value = q.cabin === 'first' ? 'first' : 'business';
    f('adults').value = q.adults || 1;
    f('children').value = q.children || 0;
    reqErr.textContent = '';
    $('#request-note').textContent = '';
    $('#summary').hidden = true;
    editBtn.hidden = true;
    form.hidden = false;
    f('from').focus();
  };
  const closeRequest = () => { form.hidden = true; $('#summary').hidden = false; editBtn.hidden = false; editBtn.focus(); };
  editBtn.addEventListener('click', openRequest);
  $('#request-cancel').addEventListener('click', closeRequest);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const from = f('from').value.trim(), to = f('to').value.trim();
    const depart = f('depart').value, ret = q.trip === 'oneway' ? '' : f('return').value;
    const adults = parseInt(f('adults').value, 10), children = parseInt(f('children').value, 10) || 0;
    if (!from || !to) { reqErr.textContent = 'Please give where you are flying from and to.'; return; }
    if (depart && ret && ret < depart) { reqErr.textContent = 'The return date is before the departure date.'; return; }
    if (!(adults >= 1 && adults <= 9) || children < 0 || children > 8) { reqErr.textContent = 'Please give 1 to 9 adults and up to 8 children.'; return; }

    const before = { route: text.route(), dates: text.dates(), cabin: text.cabin(), pax: text.pax() };
    const next = { ...q };
    [next.fromCity, next.from] = parsePlace(from);
    [next.toCity, next.to] = parsePlace(to);
    Object.assign(next, { depart, return: ret, flexible: f('flex').checked, cabin: f('cabin').value, adults, children });
    const prev = q; q = next;
    const after = { route: text.route(), dates: text.dates(), cabin: text.cabin(), pax: text.pax() };
    const labels = { route: 'Route', dates: 'Dates', cabin: 'Cabin', pax: 'Passengers' };
    const changes = Object.keys(labels).filter((k) => before[k] !== after[k]).map((k) => `${labels[k]}: ${before[k]} → ${after[k]}`);
    if (!changes.length) { q = prev; closeRequest(); return; }

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      await send(`The customer changed their request:\n${changes.join('\n')}`);
      store(); render(); closeRequest();
      $('#request-note').textContent = 'Saved. We’ve let your consultant know.';
    } catch (err) {
      q = prev;
      reqErr.textContent = err.message;
    } finally {
      btn.disabled = false; btn.textContent = 'Save changes';
    }
  });

  render();
  $('#summary').hidden = false;
  $('#more').hidden = false;
  editBtn.hidden = false;

  // --- Extra details.
  const box = $('#more-text'), err = $('#err-more'), btn = $('#more-send');
  box.addEventListener('input', () => { err.textContent = ''; box.classList.remove('is-invalid'); });
  btn.addEventListener('click', async () => {
    const details = box.value.trim();
    if (!details) { err.textContent = 'Please add your details.'; box.classList.add('is-invalid'); box.focus(); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      await send(details);
      $('#more').hidden = true;
      $('#more-sent').hidden = false;
      $('#again').hidden = false;
      $('#more-sent').focus();
    } catch (e) {
      err.textContent = e.message;
    } finally {
      btn.disabled = false; btn.textContent = 'Send details';
    }
  });
})();

// Page motion and the "What happens next" steps (run whether or not a request is saved).
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });

  // Reveal each block once as it enters the screen; never leaves content hidden.
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) targets.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    targets.forEach((el) => io.observe(el));
    addEventListener('load', () => setTimeout(() => targets.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
    }), 2500));
  }

  // One step open at a time: hover on desktop, click or tap anywhere.
  const panes = [...document.querySelectorAll('.pane')];
  const open = (p) => panes.forEach((q) => { q.classList.toggle('is-open', q === p); q.querySelector('button').setAttribute('aria-expanded', q === p); });
  const canHover = matchMedia('(hover: hover) and (min-width: 901px)');
  panes.forEach((p) => {
    p.querySelector('button').addEventListener('click', () => open(p));
    p.addEventListener('mouseenter', () => { if (canHover.matches) open(p); });
  });
})();
