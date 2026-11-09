import { element, image } from '../lib/dom.js';
import { glitchReveal } from '../lib/motion.js';
import { chips, face, paint, skillChip } from '../lib/fighter-view.js';
import { assetUrl, step } from '../lib/roster.js';

const ROTATE_MS = 7000;

/**
 * Featured operative carousel plus its reel of faces. State is one index; the view rebuilds the slide content and
 * leaves the controls in place, so focus survives. Auto-rotation pauses on hover, focus, an off-screen section,
 * a hidden tab and reduced motion (WAI carousel pattern: live region off while rotating).
 */
export function mountSpotlight({ article, reel, backdrop, roster, root, motion, start = 0 }) {
  const fighters = roster.fighters;
  let index = start;
  let timer;
  let paused = motion.matches;
  let onScreen = false;

  const art = element('div', 'spotlight__art shape shape--clip');
  const info = element('div', 'spotlight__info');
  const content = element('div', 'spotlight__content');
  const actions = element('div', 'spotlight__actions');
  const dossier = element('a', 'button button--primary shape');
  const nav = element('div', 'spotlight__nav');
  const previous = element('button', 'icon-button shape', '←');
  const next = element('button', 'icon-button shape', '→');
  const counter = element('span', 'hud spotlight__counter');
  previous.type = next.type = 'button';
  previous.setAttribute('aria-label', 'previous operative');
  next.setAttribute('aria-label', 'next operative');
  nav.append(previous, counter, next);
  actions.append(dossier, nav);
  info.append(content, actions);
  article.replaceChildren(art, info);

  const buttons = fighters.map((fighter, i) => {
    const item = paint(element('li', 'reel__item'), fighter);
    const button = element('button', 'reel__button shape shape--clip');
    button.type = 'button';
    button.setAttribute('aria-label', `${fighter.name}, ${fighter.role}`);
    button.append(face(fighter, root));
    button.addEventListener('click', () => show(i, { announce: true }));
    item.append(button);
    reel.append(item);
    return button;
  });

  function slide(fighter) {
    const figure = image(assetUrl(root, fighter.media.figure), `${fighter.name}, full-body artwork`, { className: 'spotlight__figure', loading: 'eager', width: 1024, height: 1536 });
    if (!motion.matches) figure.classList.add('is-entering');
    art.replaceChildren(element('span', 'spotlight__code', fighter.code), figure);

    const name = element('h3', 'spotlight__name', fighter.name);
    const quote = fighter.quote ? element('blockquote', 'spotlight__quote', fighter.quote) : '';
    const skills = element('ul', 'spotlight__skills');
    skills.setAttribute('role', 'list');
    skills.append(...fighter.skills.map((skill) => skillChip(fighter, skill, root)));
    content.replaceChildren(
      chips(roster, fighter, root),
      name,
      element('p', 'hud spotlight__callsign', `${fighter.code} // ${fighter.callsign}`),
      element('p', 'spotlight__identity', fighter.identity || fighter.weapon || ''),
      quote,
      skills,
    );
    glitchReveal(name, 900);
  }

  function show(i, { announce = false } = {}) {
    index = step(i, 0, fighters.length);
    const fighter = fighters[index];
    paint(article, fighter);
    paint(backdrop, fighter);
    content.setAttribute('aria-live', announce ? 'polite' : 'off');
    slide(fighter);
    dossier.href = `${root}characters/#${encodeURIComponent(fighter.id)}`;
    dossier.replaceChildren(element('span', '', `open ${fighter.name.toLowerCase()}'s dossier`), element('span', 'button__arrow', '→'));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${fighters.length}`;
    buttons.forEach((button, b) => button.setAttribute('aria-pressed', String(b === index)));
    const item = buttons[index].parentElement;
    reel.parentElement.scrollTo({ left: item.offsetLeft - reel.parentElement.clientWidth / 2 + item.offsetWidth / 2, behavior: motion.matches ? 'auto' : 'smooth' });
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (!paused && onScreen && !document.hidden) timer = setTimeout(() => show(index + 1), ROTATE_MS);
  }

  const pause = (value) => { paused = value || motion.matches; schedule(); };
  previous.addEventListener('click', () => show(index - 1, { announce: true }));
  next.addEventListener('click', () => show(index + 1, { announce: true }));
  for (const zone of [article, reel]) {
    zone.addEventListener('pointerenter', () => pause(true));
    zone.addEventListener('pointerleave', () => pause(false));
    zone.addEventListener('focusin', () => pause(true));
    zone.addEventListener('focusout', () => pause(false));
  }
  document.addEventListener('visibilitychange', schedule);
  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; schedule(); }).observe(article);
  show(index);
}
