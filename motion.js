// Motion helpers: section reveals and a small spring for things people touch.

// Reveal once when an element enters the viewport. Never replays, never leaves content hidden.
(() => {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
  }, 2500));
})();

// Once an entrance has played, drop it: a finished transform would trap fixed children (the calendar).
document.querySelectorAll('[data-rise]').forEach((el) => {
  el.addEventListener('animationend', (e) => { if (e.target === el) el.removeAttribute('data-rise'); });
});

// A spring described the way Apple does: damping ratio (1 = no overshoot) and response (seconds).
// It always starts from the live value and velocity held in `s`, so any motion can be interrupted and re-aimed.
window.Spring = {
  reduced: matchMedia('(prefers-reduced-motion: reduce)'),
  to(s, target, { velocity, damping = 1, response = 0.35, precision = 0.1, onUpdate, onRest } = {}) {
    cancelAnimationFrame(s.raf);
    if (velocity !== undefined) s.velocity = velocity;
    if (this.reduced.matches) { s.value = target; s.velocity = 0; onUpdate?.(target); onRest?.(); return; }
    const k = (2 * Math.PI / response) ** 2;
    const c = (4 * Math.PI * damping) / response;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(0.064, (now - last) / 1000); last = now;
      const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
      for (let i = 0; i < n; i++) {
        const a = -k * (s.value - target) - c * s.velocity;
        s.velocity += a * h;
        s.value += s.velocity * h;
      }
      if (Math.abs(s.value - target) < precision && Math.abs(s.velocity) < precision * 10) {
        s.value = target; s.velocity = 0; onUpdate?.(target); onRest?.(); return;
      }
      onUpdate?.(s.value);
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  },
  stop(s) { cancelAnimationFrame(s.raf); },
  // Where a flick would come to rest (Apple's projection, as in scroll deceleration).
  project(velocity, rate = 0.998) { return ((velocity / 1000) * rate) / (1 - rate); },
  // Past a boundary the element follows less and less.
  rubberband(over, size, constant = 0.55) { return (over * size * constant) / (size + constant * Math.abs(over)); },
};
