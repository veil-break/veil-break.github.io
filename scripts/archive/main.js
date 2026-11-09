import { element, image } from '../lib/dom.js';
import { classIcon, paint } from '../lib/fighter-view.js';
import { glitchReveal, observeReveals } from '../lib/motion.js';
import { assetUrl, countBy, filterFighters, KITS, loadRoster, statScale } from '../lib/roster.js';
import { createDossier } from './dossier.js';
import { jsonViewer } from './json-viewer.js';

const ROOT = '../';
const grid = document.getElementById('grid');
const legend = document.getElementById('class-legend');
const search = document.getElementById('search');
const kitSelect = document.getElementById('kit');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const details = new Map();
let roster;

/** Filter state lives in the query string, so a filtered view is a shareable link. */
function readState() {
  const params = new URLSearchParams(location.search);
  return { query: params.get('q') || '', role: params.get('class') || 'all', kit: params.get('kit') || 'all' };
}

function writeState(state) {
  const params = new URLSearchParams();
  if (state.query) params.set('q', state.query);
  if (state.role !== 'all') params.set('class', state.role);
  if (state.kit !== 'all') params.set('kit', state.kit);
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
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
  meta.append(classIcon(roster, fighter.role, ROOT, { size: 16 }), `${fighter.role} · ${fighter.rarity}`);
  body.append(meta, element('span', 'fighter-card__name', fighter.name), element('span', 'fighter-card__callsign', fighter.callsign));
  if (fighter.kit === 'hypothesis') body.append(element('span', 'chip chip--hypothesis', KITS.hypothesis.label));
  button.append(art, body);
  button.addEventListener('click', () => onOpen(fighter, button));
  return button;
}

function render(state) {
  const visible = new Set(filterFighters(roster.fighters, state).map((f) => f.id));
  for (const node of grid.querySelectorAll('.fighter-card')) node.parentElement.hidden = !visible.has(node.dataset.id);
  for (const node of legend.querySelectorAll('button')) node.setAttribute('aria-pressed', String(node.dataset.role === state.role));
  count.textContent = `${visible.size} / ${roster.fighters.length} operatives`;
  empty.hidden = visible.size > 0;
  writeState(state);
}

async function boot() {
  roster = await loadRoster(ROOT);
  const state = readState();
  const scale = statScale(roster.fighters);
  const load = async (id) => {
    if (!details.has(id)) details.set(id, fetch(`${ROOT}characters/data/${encodeURIComponent(id)}.json`).then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); }));
    try { return await details.get(id); } catch (error) { details.delete(id); throw error; }
  };
  const dossier = createDossier({
    dialog: document.getElementById('dossier'),
    roster,
    root: ROOT,
    scale,
    load,
    onClose: () => history.replaceState(null, '', location.pathname + location.search),
  });
  const open = (fighter, trigger) => {
    history.replaceState(null, '', `${location.pathname}${location.search}#${encodeURIComponent(fighter.id)}`);
    dossier.open(fighter, trigger);
  };

  const roles = countBy(roster.fighters, 'role');
  const kits = countBy(roster.fighters, 'kit');
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
  for (const option of kitSelect.options) if (kits[option.value]) option.textContent += ` (${kits[option.value]})`;

  grid.replaceChildren(...roster.fighters.map((fighter, i) => {
    const item = paint(element('li', 'reveal'), fighter);
    item.style.setProperty('--reveal-delay', `${(i % 6) * 40}ms`);
    item.append(card(fighter, open));
    return item;
  }));
  search.value = state.query;
  kitSelect.value = state.kit;
  search.addEventListener('input', () => { state.query = search.value; render(state); });
  kitSelect.addEventListener('change', () => { state.kit = kitSelect.value; render(state); });
  document.getElementById('reset').addEventListener('click', () => { Object.assign(state, { query: '', role: 'all', kit: 'all' }); search.value = ''; kitSelect.value = 'all'; render(state); });
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
  if (linked) open(linked, grid.querySelector(`[data-id="${linked.id}"]`));
}

boot().catch((error) => {
  grid.replaceChildren(element('li', 'notice', `roster offline — ${error.message}`));
});
