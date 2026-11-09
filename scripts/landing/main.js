import { createBreachEffects } from '../breach-effects.js';
import { observeReveals, reducedMotion, glitchReveal } from '../lib/motion.js';
import { loadRoster, seeded } from '../lib/roster.js';
import { mountTerminal } from '../terminal.js';
import { renderClasses } from './classes.js';
import { deploySquad, mountHero } from './hero.js';
import { createIntro } from './intro.js';
import { mountSpotlight } from './spotlight.js';
import { createVeil } from './veil.js';

const ROOT = './';
const motion = reducedMotion;
const hero = document.getElementById('breach');
const squadSlots = [...document.querySelectorAll('.hero__fighter')];
const terminalWindow = document.getElementById('terminal');
const effects = createBreachEffects({ canvas: document.getElementById('breach-effects'), motion });
const veil = createVeil(document.getElementById('veil'), { motion });
let faultTimer;

// Terminal: every command fails as text; each failure glitches the window and its canvas.
mountTerminal(() => {
  const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fault-duration')) || 640;
  terminalWindow.classList.remove('has-fault');
  clearTimeout(faultTimer);
  void terminalWindow.offsetWidth; // restart the same finite animation on rapid commands
  terminalWindow.classList.add('has-fault');
  effects.play(duration, { surface: terminalWindow });
  faultTimer = setTimeout(() => terminalWindow.classList.remove('has-fault'), duration);
});

const intro = createIntro({
  effects,
  motion,
  surface: () => document.querySelector('.hero__copy'),
  image: () => squadSlots[1],
  onHandoff: () => { veil.start(); glitchReveal(document.getElementById('hero-word'), 1600); },
  onLive: () => observeReveals(),
});

mountHero({ hero, veil, motion });

const header = document.getElementById('site-header');
const solid = () => header.toggleAttribute('data-solid', window.scrollY > hero.offsetHeight * 0.6);
window.addEventListener('scroll', solid, { passive: true });
solid();

// Premise lines light while they cross the middle band of the viewport.
const lines = document.querySelectorAll('.premise__line');
const lit = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-lit', e.isIntersecting)), { rootMargin: '-38% 0px -38% 0px' });
lines.forEach((line) => lit.observe(line));

loadRoster(ROOT).then((roster) => {
  if (intro.phase === 'splash') deploySquad({ fighters: roster.fighters, root: ROOT, slots: squadSlots, label: document.getElementById('hero-deployed'), random: seeded(Date.now()) });
  document.querySelectorAll('[data-roster-count]').forEach((node) => { node.textContent = String(roster.fighters.length); });
  document.querySelectorAll('[data-progression]').forEach((node) => { node.textContent = String(roster.progression[node.dataset.progression] ?? node.textContent); });
  document.querySelector('[data-source="characters"]').textContent = `veil-break/characters ${roster.source.version}`;
  renderClasses(document.getElementById('class-grid'), roster, ROOT);
  mountSpotlight({ article: document.getElementById('spotlight'), reel: document.getElementById('reel'), backdrop: document.getElementById('operatives-backdrop'), roster, root: ROOT, motion, start: Math.floor(seeded(Date.now() ^ 0x5f3759df)() * roster.fighters.length) });
  if (intro.phase === 'live') observeReveals();
}).catch((error) => {
  document.getElementById('class-grid').append(Object.assign(document.createElement('li'), { className: 'hud', textContent: `roster offline — ${error.message}` }));
});

fetch(`${ROOT}vendor/veilbreak/gui/source.json`).then((r) => r.json()).then((kit) => {
  document.querySelector('[data-source="gui"]').textContent = `veilbreak design system · gui ${kit.version}`;
}).catch(() => {});
