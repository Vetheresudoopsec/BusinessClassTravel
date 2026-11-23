// A thin scrollbar that floats over the page, in place of the browser's own (hidden in the page CSS).
// It follows the scroll, fades out when the page is still, and can be dragged or clicked like a real one.
// Purely visual: the page scrolls natively, so keyboard, wheel and touch scrolling are untouched.
(() => {
  const css = `
.sb { position: fixed; top: 4px; right: 2px; bottom: 4px; width: 12px; z-index: 50; opacity: 0; transition: opacity 300ms ease; touch-action: none; }
.sb.is-on, .sb:hover, .sb.is-drag { opacity: 1; }
.sb[hidden] { display: none; }
.sb__thumb { position: absolute; right: 2px; width: 6px; min-height: 40px; border-radius: 3px; background: rgba(20, 32, 47, 0.5); box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.55); transition: width 160ms ease, background-color 160ms ease; cursor: grab; }
.sb:hover .sb__thumb, .sb.is-drag .sb__thumb { width: 8px; background: rgba(20, 32, 47, 0.7); }
.sb.is-drag .sb__thumb { cursor: grabbing; }
@media (hover: none) { .sb { pointer-events: none; } }`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);

  const bar = document.createElement('div');
  bar.className = 'sb';
  bar.setAttribute('aria-hidden', 'true');
  const thumb = document.createElement('div');
  thumb.className = 'sb__thumb';
  bar.append(thumb);
  document.body.append(bar);

  const root = document.documentElement;
  let thumbH = 0, track = 0, maxScroll = 0, idle = 0, frame = 0;

  const measure = () => {
    const view = innerHeight, full = root.scrollHeight;
    maxScroll = full - view;
    bar.hidden = maxScroll <= 1;
    track = bar.clientHeight;
    thumbH = Math.max(40, Math.round(track * view / full));
    thumb.style.height = `${thumbH}px`;
    place();
  };
  const place = () => {
    frame = 0;
    const y = maxScroll > 0 ? (scrollY / maxScroll) * (track - thumbH) : 0;
    thumb.style.transform = `translateY(${Math.round(y)}px)`;
  };
  const wake = () => {
    bar.classList.add('is-on');
    clearTimeout(idle);
    idle = setTimeout(() => bar.classList.remove('is-on'), 1000);
  };

  addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(place); wake(); }, { passive: true });
  addEventListener('resize', measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  addEventListener('load', measure);
  measure();

  // Drag the thumb, or click the track to jump there.
  let startY = 0, startScroll = 0;
  const toScroll = (dy) => (dy / Math.max(1, track - thumbH)) * maxScroll;
  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    startY = e.clientY; startScroll = scrollY;
    thumb.setPointerCapture(e.pointerId);
    bar.classList.add('is-drag');
  });
  thumb.addEventListener('pointermove', (e) => {
    if (!bar.classList.contains('is-drag')) return;
    scrollTo({ top: startScroll + toScroll(e.clientY - startY), behavior: 'instant' });
  });
  const stop = () => { bar.classList.remove('is-drag'); wake(); };
  thumb.addEventListener('pointerup', stop);
  thumb.addEventListener('pointercancel', stop);
  bar.addEventListener('pointerdown', (e) => {
    if (e.target !== bar) return;
    const y = e.clientY - bar.getBoundingClientRect().top - thumbH / 2;
    scrollTo({ top: toScroll(y), behavior: 'smooth' });
  });
})();
