/**
 * The dossier dialog: one fighter's summary renders at once, the full record (characters/data/<id>.json) loads on
 * open and fills the panels. Tabs follow the WAI tabs pattern (arrow keys, Home, End).
 */
import { element, image, maskIcon, rich } from '../lib/dom.js';
import { chips, paint } from '../lib/fighter-view.js';
import { glitchReveal } from '../lib/motion.js';
import { assetUrl, KITS, SLOTS, skillMeta } from '../lib/roster.js';
import { jsonViewer } from './json-viewer.js';

const STATS = [['health', 'hp'], ['armor', 'armor'], ['stability', 'stability'], ['move · cm/s', 'moveSpeed']];
const RANK_LABEL = { 0: 'stock', 3: 'augmented', 5: 'transcendent' };
const LORE_LABEL = { backstory: 'backstory', syndicateRecord: 'syndicate record', psychProfile: 'psych profile' };
const ARTWORK = [['figure', 'full body'], ['face', 'face close-up'], ['dossier', 'dossier sheet']];

function section(title, ...children) {
  const node = element('section', 'dossier__section');
  if (title) node.append(element('h3', 'label', title));
  node.append(...children.filter(Boolean));
  return node;
}

function meters(fighter, scale) {
  const list = element('dl', 'dossier__stats');
  for (const [label, key] of STATS) {
    const row = element('div', 'meter');
    const rail = element('dd', 'meter__rail');
    const fill = element('span', 'meter__fill');
    fill.style.setProperty('--value', String(fighter.stats[key] / scale[key]));
    rail.append(fill);
    row.append(element('dt', 'meter__label hud', label), rail, element('dd', 'meter__value', fighter.stats[key]));
    list.append(row);
  }
  return list;
}

function overview(fighter, record, scale) {
  const dossier = record?.dossier || {};
  const lore = dossier.lore || {};
  const kit = KITS[fighter.kit];
  return [
    rich(fighter.identity || 'fighter dossier', 'p', 'dossier__lede'),
    meters(fighter, scale),
    fighter.kit === 'hypothesis' ? element('p', 'notice', `${kit.label}: ${kit.detail}.`) : null,
    dossier.weaponConcept ? section('weapon', element('p', '', dossier.weaponConcept)) : null,
    dossier.selectionRationale ? section('combat identity', rich(dossier.selectionRationale)) : null,
    ...Object.entries(LORE_LABEL).filter(([key]) => lore[key]).map(([key, label]) => section(label, rich(lore[key]))),
    fighter.quote ? element('blockquote', 'dossier__quote', fighter.quote) : null,
    dossier.loreStatus ? element('p', 'fineprint', dossier.loreStatus) : null,
    fighter.pending.length ? section('still to come', element('p', 'hud', fighter.pending.join(' · '))) : null,
  ];
}

function ranks(skill) {
  const forms = skill?.mechanics?.forms || [];
  if (!forms.length) return null;
  const ladder = element('ol', 'ranks');
  ladder.setAttribute('role', 'list');
  for (const form of forms) {
    const item = element('li', 'ranks__step');
    item.append(element('span', 'hud ranks__rank', `r${form.rank} · ${RANK_LABEL[form.rank] || 'rank'}`), element('b', '', form.name), rich(form.description));
    ladder.append(item);
  }
  return ladder;
}

function abilities(fighter, record, root) {
  return SLOTS.map((slot) => {
    const summary = fighter.skills.find((s) => s.slot === slot);
    const skill = record?.[slot];
    const article = element('article', 'ability shape');
    const head = element('header', 'ability__head');
    const title = element('div');
    title.append(element('span', 'hud', slot), element('h3', '', summary.name));
    head.append(summary.icon ? maskIcon(assetUrl(root, summary.icon), { size: 44, tone: 'var(--signal)' }) : element('span'), title);
    article.append(head);
    if (skill) {
      article.append(rich(skill.description, 'p', 'ability__text'));
      const meta = slot === 'passive' ? '' : skillMeta(skill);
      if (meta) article.append(element('p', 'hud ability__meta', meta));
      const ladder = ranks(skill);
      if (ladder) article.append(ladder);
      const raw = element('details', 'disclosure');
      raw.append(element('summary', 'label', 'complete ability data'));
      raw.addEventListener('toggle', () => { if (raw.open && raw.childElementCount === 1) raw.append(jsonViewer(skill, `${fighter.id}-${slot}.json`)); });
      article.append(raw);
    } else article.append(element('p', 'hud', 'loading…'));
    return article;
  });
}

function artwork(fighter, root) {
  return ARTWORK.filter(([key]) => fighter.media[key]).map(([key, label]) => {
    const figure = element('figure', `art art--${key}`);
    const link = element('a', 'art__frame shape shape--clip');
    link.href = assetUrl(root, fighter.media[key]);
    link.target = '_blank';
    link.rel = 'noopener';
    link.append(image(link.href, `${fighter.name}, ${label}`));
    figure.append(link, element('figcaption', 'hud', label));
    return figure;
  });
}

/** Mounts the dialog once; returns open(fighter, trigger). */
export function createDossier({ dialog, roster, root, scale, load, onClose }) {
  const art = dialog.querySelector('.dossier__art');
  const head = dialog.querySelector('.dossier__identity');
  const tabs = [...dialog.querySelectorAll('[role="tab"]')];
  const panels = Object.fromEntries(tabs.map((tab) => [tab.dataset.tab, dialog.querySelector(`#${tab.getAttribute('aria-controls')}`)]));
  let current;
  let trigger;

  function select(tab, focus = false) {
    for (const item of tabs) {
      const on = item === tab;
      item.setAttribute('aria-selected', String(on));
      item.tabIndex = on ? 0 : -1;
      panels[item.dataset.tab].hidden = !on;
    }
    if (tab.dataset.tab === 'json' && current?.record && !panels.json.hasChildNodes()) panels.json.append(jsonViewer(current.detail, `veilbreak-${current.fighter.id}.json`));
    if (focus) tab.focus();
  }

  function fill(fighter, detail) {
    const record = detail?.record;
    panels.overview.replaceChildren(...overview(fighter, record, scale).filter(Boolean));
    panels.abilities.replaceChildren(...abilities(fighter, record, root));
    panels.json.replaceChildren();
    if (!detail) panels.json.append(element('p', 'hud', 'loading…'));
    const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (active?.dataset.tab === 'json') select(active);
  }

  async function open(fighter, from) {
    trigger = from;
    current = { fighter };
    paint(dialog, fighter);
    const figure = image(assetUrl(root, fighter.media.figure), `${fighter.name}, full-body artwork`, { className: 'dossier__figure', loading: 'eager', width: 1024, height: 1536 });
    art.replaceChildren(element('span', 'dossier__code', fighter.code), figure);
    const name = element('h2', 'dossier__name', fighter.name);
    name.id = 'dossier-name';
    head.replaceChildren(chips(roster, fighter, root), name, element('p', 'hud dossier__callsign', `${fighter.code} // ${fighter.callsign} · ${fighter.pronouns || ''}`));
    panels.artwork.replaceChildren(...artwork(fighter, root));
    fill(fighter);
    select(tabs[0]);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.dossier__scroll').scrollTop = 0;
    glitchReveal(name, 900);
    try {
      const detail = await load(fighter.id);
      if (current.fighter !== fighter) return;
      current = { fighter, detail, record: detail.record };
      fill(fighter, detail);
    } catch (error) {
      if (current.fighter === fighter) panels.overview.append(element('p', 'notice', `full record unavailable — ${error.message}`));
    }
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab)));
  dialog.querySelector('[role="tablist"]').addEventListener('keydown', (event) => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(tabs[(keys[event.key] + tabs.length) % tabs.length], true);
  });
  dialog.querySelector('.dossier__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { onClose?.(); trigger?.focus(); });
  return { open };
}
