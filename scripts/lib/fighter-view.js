/** View pieces for one fighter, shared by the landing and the archive. Plain data in, DOM out. */
import { element, image, maskIcon } from './dom.js';
import { assetUrl, KITS } from './roster.js';

export const classTone = (role) => `var(--class-${role})`;

/** The fighter's own signal colour and its class tone, as custom properties on a node. */
export function paint(node, fighter) {
  node.style.setProperty('--signal', fighter.signal);
  node.style.setProperty('--tone', classTone(fighter.role));
  return node;
}

export function classIcon(roster, role, root, options = {}) {
  const entry = roster.classes.find((c) => c.id === role);
  return entry ? maskIcon(assetUrl(root, entry.icon), { tone: classTone(role), ...options }) : element('span');
}

export function chips(roster, fighter, root) {
  const row = element('div', 'chips');
  const role = element('span', 'chip');
  role.style.setProperty('--tone', classTone(fighter.role));
  role.append(classIcon(roster, fighter.role, root, { size: 16 }), fighter.role);
  const kit = element('span', `chip chip--${fighter.kit}`, KITS[fighter.kit].label);
  kit.title = KITS[fighter.kit].detail;
  row.append(role, element('span', `chip chip--${fighter.rarity}`, fighter.rarity), kit);
  return row;
}

export function skillChip(fighter, skill, root) {
  const chip = element('li', 'skill-chip shape');
  const copy = element('span');
  copy.append(element('small', 'hud', skill.slot), element('b', '', skill.name));
  chip.append(skill.icon ? maskIcon(assetUrl(root, skill.icon), { tone: 'var(--signal)' }) : element('span'), copy);
  return chip;
}

export function face(fighter, root, { size = 'thumb', className = '' } = {}) {
  const path = fighter.media[size] || fighter.media.face;
  return path ? image(assetUrl(root, path), `${fighter.name} portrait`, { className, width: 256, height: 256 }) : element('span', className);
}
