import { element } from '../lib/dom.js';
import { classIcon, classTone, face } from '../lib/fighter-view.js';
import { CLASS_COPY } from '../lib/roster.js';

const FACES_PER_CLASS = 4;

/** One card per class: icon, name, operative count, doctrine and a stack of its faces; links into the archive. */
export function renderClasses(list, roster, root) {
  list.replaceChildren(...roster.classes.map((entry, index) => {
    const members = roster.fighters.filter((f) => f.role === entry.id);
    const item = element('li', 'reveal');
    item.style.setProperty('--reveal-delay', `${index * 80}ms`);
    const card = element('a', 'class-card shape shape--lg');
    card.href = `${root}characters/?class=${encodeURIComponent(entry.id)}`;
    card.style.setProperty('--tone', classTone(entry.id));
    const faces = element('span', 'class-card__faces');
    faces.append(...members.slice(0, FACES_PER_CLASS).map((f) => face(f, root)));
    faces.setAttribute('aria-hidden', 'true');
    card.append(
      classIcon(roster, entry.id, root),
      element('h3', '', entry.id),
      element('span', 'hud class-card__count', `${String(members.length).padStart(2, '0')} operatives`),
      element('p', '', CLASS_COPY[entry.id] || ''),
      faces,
      element('span', 'label class-card__cta', `browse ${entry.id}s →`),
    );
    item.append(card);
    return item;
  }));
}
