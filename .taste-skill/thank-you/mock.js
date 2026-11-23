// Mockups only: seed a sample request so the summary shows, then run the reveals.
// Load in <head> BEFORE /thank-you.js (both deferred, so order holds).
(() => {
  try {
    if (!sessionStorage.getItem('bct-last-quote')) {
      sessionStorage.setItem('bct-last-quote', JSON.stringify({
        firstName: 'Jordan', name: 'Jordan Ellis', email: 'jordan@example.com',
        from: 'JFK', fromCity: 'New York', to: 'LHR', toCity: 'London',
        depart: '2027-03-12', return: '2027-03-26', trip: 'return', flexible: true,
        cabin: 'business', adults: 2, children: 0,
      }));
    }
  } catch {}
})();

// The route as text for the mockups' own slots ([data-route], [data-from], [data-to]).
document.addEventListener('DOMContentLoaded', () => {
  let q = null;
  try { q = JSON.parse(sessionStorage.getItem('bct-last-quote') || 'null'); } catch {}
  if (q) {
    document.querySelectorAll('[data-from]').forEach((el) => { el.textContent = q.from; });
    document.querySelectorAll('[data-to]').forEach((el) => { el.textContent = q.to; });
    document.querySelectorAll('[data-route]').forEach((el) => { el.textContent = `${q.fromCity} to ${q.toCity}`; });
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });

  // Reveal once on entry; never leaves content hidden.
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  targets.forEach((el) => io.observe(el));
  addEventListener('load', () => setTimeout(() => targets.forEach((el) => {
    const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
  }), 2500));
});
