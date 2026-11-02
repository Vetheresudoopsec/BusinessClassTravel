// Thank-you page: shows the request just sent (saved by app.js for this tab only) and takes extra details.
(() => {
  const $ = (sel) => document.querySelector(sel);
  let q = null;
  try { q = JSON.parse(sessionStorage.getItem('bct-last-quote') || 'null'); } catch {}

  // No request in this tab (opened directly, or after a request sent without JavaScript): a plain thank-you.
  if (!q) { $('#again').hidden = false; return; }

  const day = (v) => {
    const d = v ? new Date(`${v}T00:00:00`) : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '') : '';
  };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  if (q.firstName) $('#thanks-title').textContent = `Thank You for Your Request, ${q.firstName}`;
  if (q.email) $('#thanks-text').textContent = `A consultant is preparing Business Class fares for your journey. You will hear from us within 24 hours, at ${q.email}.`;

  const depart = day(q.depart), ret = day(q.return);
  let dates = depart && ret ? `${depart} to ${ret}` : depart || 'To be agreed';
  if (q.trip === 'oneway' && depart) dates = `${depart}, one way`;
  if (q.flexible) dates += ' (± 3 days)';
  $('#sum-route').textContent = `${q.fromCity} (${q.from}) to ${q.toCity} (${q.to})`;
  $('#sum-dates').textContent = dates;
  $('#sum-cabin').textContent = q.cabin === 'first' ? 'First Class' : 'Business Class';
  $('#sum-pax').textContent = plural(q.adults, 'adult', 'adults') + (q.children ? `, ${plural(q.children, 'child', 'children')}` : '');
  $('#summary').hidden = false;
  $('#more').hidden = false;

  const box = $('#more-text'), err = $('#err-more'), btn = $('#more-send');
  box.addEventListener('input', () => { err.textContent = ''; box.classList.remove('is-invalid'); });
  btn.addEventListener('click', async () => {
    const details = box.value.trim();
    if (!details) { err.textContent = 'Please add your details.'; box.classList.add('is-invalid'); box.focus(); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const res = await fetch('quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: 'details', name: q.name, email: q.email, route: `${q.from} to ${q.to}`, details, page: location.href }),
      });
      if (!res.ok) throw new Error('Request failed');
      $('#more').hidden = true;
      $('#more-sent').hidden = false;
      $('#again').hidden = false;
      $('#more-sent').focus();
    } catch {
      err.textContent = 'Your details could not be sent. Please try again, or call us on 305-244-6463.';
    } finally {
      btn.disabled = false; btn.textContent = 'Send details';
    }
  });
})();
