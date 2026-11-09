/** Motion helpers: the kit's Glitch reveal (window.Veilbreak, vendored @veilbreak/gui) and one scroll observer. */

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Glitch.Reveal from the kit: noise glyphs decode left to right; the kit itself fades under reduced motion. */
export function glitchReveal(node, milliseconds) {
  const glitch = window.Veilbreak?.Glitch;
  return node && glitch ? glitch.reveal(node, milliseconds) : Promise.resolve();
}

/** Flip .is-visible once per node as it scrolls into view; glitch-reveal nodes marked [data-glitch]. */
const observed = new WeakSet();

export function observeReveals(root = document) {
  const nodes = [...root.querySelectorAll('.reveal, [data-glitch]')].filter((node) => !observed.has(node));
  nodes.forEach((node) => observed.add(node));
  const show = (node) => {
    node.classList.add('is-visible');
    if (node.hasAttribute('data-glitch')) glitchReveal(node, Number(node.dataset.glitch) || undefined);
  };
  if (!('IntersectionObserver' in window)) { nodes.forEach(show); return () => {}; }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      show(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  nodes.forEach((node) => observer.observe(node));
  return () => observer.disconnect();
}

/** rAF-throttled callback, so scroll and pointer handlers write styles at most once a frame. */
export function perFrame(callback) {
  let queued = false;
  let last;
  return (...args) => {
    last = args;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; callback(...last); });
  };
}
