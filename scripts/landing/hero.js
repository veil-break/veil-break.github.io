import { assetUrl, pickSquad } from '../lib/roster.js';
import { perFrame } from '../lib/motion.js';

const FLICKER_MS = 1400;

/**
 * Hero and backdrop state → numbers: --px/--py (pointer, -1..1) and --hero-progress (0..1 over the hero's height) as
 * CSS variables for the hero, pointer drift and scroll depth for the backdrop canvas. The views own every transform.
 */
export function mountHero({ hero, backdrop, motion }) {
  const write = perFrame((x, y) => {
    hero.style.setProperty('--px', x.toFixed(3));
    hero.style.setProperty('--py', y.toFixed(3));
    backdrop.setPointer(x);
  });
  const scroll = perFrame(() => {
    const depth = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
    // The city climbs as the page descends; past the hero the scene steps back behind the copy.
    backdrop.setScroll(depth > 0 ? window.scrollY / depth : 0, Math.max(0, (window.scrollY - hero.offsetHeight * 0.35) / (hero.offsetHeight * 0.8)) * 0.62);
  });

  if (!motion.matches) {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      write((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => write(0, 0));
  }
  window.addEventListener('scroll', scroll, { passive: true });
  window.addEventListener('resize', scroll, { passive: true });
  scroll();

  // HUD readouts drift like live telemetry; numbers only, no layout.
  const readouts = [...hero.querySelectorAll('[data-flicker]')].map((node) => ({ node, base: Number(node.textContent) }));
  if (!motion.matches && readouts.length) {
    setInterval(() => {
      if (document.hidden) return;
      for (const { node, base } of readouts) node.textContent = String(Math.max(0, Math.min(99, base + Math.round((Math.random() - 0.5) * 6))));
    }, FLICKER_MS);
  }
}

/** Swap the default trio for a random squad of three classes (only while the splash still covers the hero). */
export function deploySquad({ fighters, root, slots, label, random }) {
  const squad = pickSquad(fighters, random, slots.length);
  slots.forEach((slot, i) => {
    const fighter = squad[i];
    if (!fighter?.media.figure) return;
    slot.src = assetUrl(root, fighter.media.figure);
  });
  label.textContent = `deployed // ${squad.map((f) => f.name.toLowerCase()).join(' · ')}`;
  return squad;
}
