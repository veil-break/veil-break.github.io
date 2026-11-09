import { element, image } from '../lib/dom.js';
import { classIcon, paint } from '../lib/fighter-view.js';
import { glitchReveal, observeReveals } from '../lib/motion.js';
import { assetUrl, clearFilters, countBy, filterFighters, KITS, loadRoster, readFilters, statScale, writeFilters } from '../lib/roster.js';
import { createDossier } from './dossier.js';
import { jsonViewer } from './json-viewer.js';

const ROOT = '../';
const grid = document.getElementById('grid');
const legend = document.getElementById('class-legend');
const search = document.getElementById('search');
const selects = [...document.querySelectorAll('select[data-filter]')];
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const details = new Map();
let roster;
let visible = [];

const cardOf = (fighter) => grid.querySelector(`.fighter-card[data-id="${fighter.id}"]`);

function replaceUrl({ params = new URLSearchParams(location.search), hash = location.hash } = {}) {
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${hash}`);
}

function card(fighter, onOpen) {
  const button = element('button', 'fighter-card shape shape--clip');
  button.type = 'button';
  button.dataset.id = fighter.id;
  button.setAttribute('aria-haspopup', 'dialog');
  const art = element('span', 'fighter-card__art');
  art.append(element('span', 'fighter-card__code', fighter.code), image(assetUrl(ROOT, fighter.media.face), '', { width: 640, height: 640 }));
  const body = element('span', 'fighter-card__body');
  const meta = element('span', 'fighter-card__meta hud');
  meta.append(classIcon(roster, fighter.role, ROOT, { size: 16 }), `${fighter.role} · `, element('span', `fighter-card__rarity fighter-card__rarity--${fighter.rarity}`, fighter.rarity));
  body.append(meta, element('span', 'fighter-card__name', fighter.name), element('span', 'fighter-card__callsign', fighter.callsign));
  if (fighter.kit === 'hypothesis') body.append(element('span', 'chip chip--hypothesis', KITS.hypothesis.label));
  button.append(art, body);
  button.addEventListener('click', () => onOpen(fighter));
  return button;
}

/** State → view: the visible cards, the pressed class, every control's value, the count and the URL. */
function render(state) {
  visible = filterFighters(roster.fighters, state);
  const ids = new Set(visible.map((f) => f.id));
  for (const node of grid.querySelectorAll('.fighter-card')) node.parentElement.hidden = !ids.has(node.dataset.id);
  for (const node of legend.querySelectorAll('button')) node.setAttribute('aria-pressed', String(node.dataset.role === state.role));
  search.value = state.query;
  for (const select of selects) select.value = state[select.dataset.filter];
  count.textContent = `${visible.length} / ${roster.fighters.length} operatives`;
  empty.hidden = visible.length > 0;
  replaceUrl({ params: writeFilters(state) });
}

async function boot() {
  roster = await loadRoster(ROOT);
  const state = readFilters(new URLSearchParams(location.search));
  const load = async (id) => {
    if (!details.has(id)) details.set(id, fetch(`${ROOT}characters/data/${encodeURIComponent(id)}.json`).then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); }));
    try { return await details.get(id); } catch (error) { details.delete(id); throw error; }
  };
  const dossier = createDossier({
    dialog: document.getElementById('dossier'),
    roster,
    root: ROOT,
    scale: statScale(roster.fighters),
    load,
    sequence: () => visible,
    triggerOf: cardOf,
    onShow: (fighter) => replaceUrl({ hash: `#${encodeURIComponent(fighter.id)}` }),
    onClose: () => replaceUrl({ hash: '' }),
  });

  const roles = countBy(roster.fighters, 'role');
  legend.replaceChildren(...roster.classes.map((entry) => {
    const button = element('button', 'class-toggle shape');
    button.type = 'button';
    button.dataset.role = entry.id;
    button.style.setProperty('--tone', `var(--class-${entry.id})`);
    const copy = element('span');
    copy.append(element('b', 'label', entry.id), element('small', 'hud', `${roles[entry.id] || 0} operatives`));
    button.append(classIcon(roster, entry.id, ROOT, { size: 36 }), copy);
    button.addEventListener('click', () => { state.role = state.role === entry.id ? 'all' : entry.id; render(state); });
    return button;
  }));
  // Each select filters one roster field and shows how many fighters each option holds.
  for (const select of selects) {
    const counts = countBy(roster.fighters, select.dataset.filter);
    for (const option of select.options) if (counts[option.value]) option.textContent += ` (${counts[option.value]})`;
    select.addEventListener('change', () => { state[select.dataset.filter] = select.value; render(state); });
  }

  grid.replaceChildren(...roster.fighters.map((fighter, i) => {
    const item = paint(element('li', 'reveal'), fighter);
    item.style.setProperty('--reveal-delay', `${(i % 6) * 40}ms`);
    item.append(card(fighter, dossier.open));
    return item;
  }));
  search.addEventListener('input', () => { state.query = search.value; render(state); });
  document.getElementById('reset').addEventListener('click', () => { Object.assign(state, clearFilters()); render(state); });
  render(state);

  document.querySelectorAll('[data-roster-count]').forEach((node) => { node.textContent = String(roster.fighters.length); });
  document.getElementById('edition').textContent = `characters ${roster.source.version} · ${roster.source.commit.slice(0, 7)}`;
  const systems = document.getElementById('systems');
  systems.addEventListener('toggle', async () => {
    const target = systems.querySelector('.systems__body');
    if (!systems.open || target.hasChildNodes()) return;
    target.append(element('p', 'hud', 'loading…'));
    const data = await fetch(`${ROOT}characters/data/systems.json`).then((r) => r.json());
    target.replaceChildren(jsonViewer(data, 'veilbreak-systems.json'));
  });

  observeReveals();
  glitchReveal(document.getElementById('archive-title'), 1400);
  const linked = roster.fighters.find((f) => f.id === decodeURIComponent(location.hash.slice(1)));
  if (linked) dossier.open(linked);
}

boot().catch((error) => {
  grid.replaceChildren(element('li', 'notice', `roster offline — ${error.message}`));
});
