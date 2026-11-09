/**
 * The dossier dialog: one fighter's summary renders at once, the full record (characters/data/<id>.json) loads on
 * open and fills the panels. Tabs follow the WAI tabs pattern (arrow keys, Home, End). The arrows beside the close
 * button step through the fighters the archive currently shows, sliding the view the way it travels.
 */
import { element, image, maskIcon, rich, segmented } from '../lib/dom.js';
import { chips, paint } from '../lib/fighter-view.js';
import { glitchReveal, reducedMotion } from '../lib/motion.js';
import { assetUrl, KITS, RANKS, SLOTS, skillMeta, step } from '../lib/roster.js';
import { jsonViewer } from './json-viewer.js';

const STATS = [['health', 'hp'], ['armor', 'armor'], ['stability', 'stability'], ['move · cm/s', 'moveSpeed']];
const LORE_LABEL = { backstory: 'backstory', syndicateRecord: 'syndicate record', psychProfile: 'psych profile' };
const ARTWORK = [['figure', 'full body'], ['face', 'face close-up'], ['dossier', 'dossier sheet']];
const SLIDE = { distance: 56, out: 140, in: 300 };
const ARROW_KEYS_OWNED = '[role="tablist"], [role="radiogroup"], input, select, textarea, .jv';

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

/** The forms a skill can show, rank ascending; a skill without authored forms shows its stock text as rank 0. */
function formsOf(skill) {
  const forms = (skill?.mechanics?.forms || []).map((form) => ({ ...form, rank: Number(form.rank) }));
  return forms.length ? forms.sort((a, b) => a.rank - b.rank) : [{ rank: 0, name: skill?.name, description: skill?.description }];
}

/**
 * One compact ability: icon, slot and name, the stock readout, and the selected rank's form. Its own toggle picks
 * the rank; setRank() lets the panel-wide toggle drive every ability at once.
 */
function ability(fighter, slot, skill, root, rank) {
  const summary = fighter.skills.find((s) => s.slot === slot);
  const article = element('article', 'ability shape');
  const icon = summary.icon ? maskIcon(assetUrl(root, summary.icon), { size: 36, tone: 'var(--signal)' }) : element('span');
  const title = element('div', 'ability__title');
  title.append(element('span', 'hud', slot), element('h3', '', summary.name));
  const head = element('header', 'ability__head');
  head.append(icon, title);
  article.append(head);
  if (!skill) {
    article.append(element('p', 'hud', 'loading…'));
    return { node: article, setRank() {} };
  }
  const forms = formsOf(skill);
  const body = element('div', 'ability__form');
  const show = (value) => {
    const form = forms.find((f) => f.rank === Number(value)) || forms[0];
    const label = element('p', 'hud ability__rank', `r${form.rank} · ${RANKS[form.rank] || 'rank'}${form.rank && form.name ? ` — ${form.name}` : ''}`);
    body.replaceChildren(label, rich(form.description, 'p', 'ability__text'));
    article.dataset.rank = String(form.rank);
  };
  let toggle;
  if (forms.length > 1) {
    toggle = segmented({
      label: `${summary.name} rank`,
      options: forms.map((f) => ({ value: f.rank, label: `r${f.rank}`, title: `${RANKS[f.rank] || 'rank'}: ${f.name}` })),
      value: forms.some((f) => f.rank === rank) ? rank : forms[0].rank,
      onChange: show,
      className: 'ability__ranks',
    });
    head.append(toggle);
  }
  const meta = slot === 'passive' ? '' : skillMeta(skill);
  if (meta) article.append(element('p', 'hud ability__meta', meta));
  article.append(body);
  const raw = element('details', 'disclosure');
  raw.append(element('summary', 'hud', 'ability data'));
  raw.addEventListener('toggle', () => { if (raw.open && raw.childElementCount === 1) raw.append(jsonViewer(skill, `${fighter.id}-${slot}.json`)); });
  article.append(raw);
  const setRank = (value) => {
    const target = forms.some((f) => f.rank === Number(value)) ? Number(value) : forms[0].rank;
    toggle?.set(target);
    show(target);
  };
  setRank(rank);
  return { node: article, setRank };
}

function abilities(fighter, record, root, state) {
  const items = SLOTS.map((slot) => ability(fighter, slot, record?.[slot], root, state.rank));
  const bar = element('div', 'abilities__bar');
  bar.append(
    element('p', 'hud', 'rank shown'),
    segmented({
      label: 'rank for every ability',
      options: Object.entries(RANKS).map(([rank, name]) => ({ value: Number(rank), label: `r${rank}`, title: name })),
      value: state.rank,
      onChange: (value) => { state.rank = Number(value); items.forEach((item) => item.setRank(state.rank)); },
    }),
  );
  return [bar, ...items.map((item) => item.node)];
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

function slide(nodes, frames, duration, easing) {
  return Promise.all(nodes.map((node, i) => node.animate(frames(i), { duration, easing, fill: 'forwards' }).finished.catch(() => {})));
}

/**
 * Mounts the dialog once. sequence() is the list the arrows walk (the archive's visible fighters), triggerOf(fighter)
 * the element focus returns to on close, onShow(fighter) runs on every fighter shown.
 */
export function createDossier({ dialog, roster, root, scale, load, sequence, triggerOf, onShow, onClose }) {
  const art = dialog.querySelector('.dossier__art');
  const scroller = dialog.querySelector('.dossier__scroll');
  const head = dialog.querySelector('.dossier__identity');
  const previous = dialog.querySelector('[data-step="-1"]');
  const next = dialog.querySelector('[data-step="1"]');
  const counter = dialog.querySelector('.dossier__counter');
  const tabs = [...dialog.querySelectorAll('[role="tab"]')];
  const panels = Object.fromEntries(tabs.map((tab) => [tab.dataset.tab, dialog.querySelector(`#${tab.getAttribute('aria-controls')}`)]));
  const view = { rank: 0 };
  let current;
  let moving = false;

  function select(tab, focus = false) {
    for (const item of tabs) {
      const on = item === tab;
      item.setAttribute('aria-selected', String(on));
      item.tabIndex = on ? 0 : -1;
      panels[item.dataset.tab].hidden = !on;
    }
    if (tab.dataset.tab === 'json' && current?.detail && !panels.json.hasChildNodes()) panels.json.append(jsonViewer(current.detail, `veilbreak-${current.fighter.id}.json`));
    if (focus) tab.focus();
  }

  const activeTab = () => tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];

  function fill(fighter, detail) {
    const record = detail?.record;
    panels.overview.replaceChildren(...overview(fighter, record, scale).filter(Boolean));
    panels.abilities.replaceChildren(...abilities(fighter, record, root, view));
    panels.json.replaceChildren();
    if (!detail) panels.json.append(element('p', 'hud', 'loading…'));
    if (activeTab().dataset.tab === 'json') select(activeTab());
  }

  function neighbours(fighter) {
    const list = sequence();
    const index = list.indexOf(fighter);
    const at = (delta) => (index < 0 || list.length < 2 ? null : list[step(index, delta, list.length)]);
    return { list, index, previous: at(-1), next: at(1) };
  }

  function render(fighter) {
    current = { fighter };
    paint(dialog, fighter);
    const figure = image(assetUrl(root, fighter.media.figure), `${fighter.name}, full-body artwork`, { className: 'dossier__figure', loading: 'eager', width: 1024, height: 1536 });
    art.replaceChildren(element('span', 'dossier__code', fighter.code), figure);
    const name = element('h2', 'dossier__name', fighter.name);
    name.id = 'dossier-name';
    head.replaceChildren(chips(roster, fighter, root), name, element('p', 'hud dossier__callsign', `${fighter.code} // ${fighter.callsign} · ${fighter.pronouns || ''}`));
    panels.artwork.replaceChildren(...artwork(fighter, root));
    fill(fighter);
    scroller.scrollTop = 0;
    const around = neighbours(fighter);
    for (const [button, target, word] of [[previous, around.previous, 'previous'], [next, around.next, 'next']]) {
      button.disabled = !target;
      button.setAttribute('aria-label', target ? `${word} operative: ${target.name}` : `no ${word} operative`);
    }
    counter.textContent = around.index < 0 ? '' : `${String(around.index + 1).padStart(2, '0')} / ${around.list.length}`;
    onShow?.(fighter);
    glitchReveal(name, 900);
    load(fighter.id).then((detail) => {
      if (current.fighter !== fighter) return;
      current = { fighter, detail };
      fill(fighter, detail);
    }).catch((error) => {
      if (current.fighter === fighter) panels.overview.append(element('p', 'notice', `full record unavailable — ${error.message}`));
    });
  }

  function open(fighter) {
    view.rank = 0;
    render(fighter);
    select(tabs[0]);
    if (!dialog.open) dialog.showModal();
  }

  /** Slide out the way we leave, swap, slide in from the other side; the selected tab stays selected. */
  async function go(delta) {
    const target = neighbours(current?.fighter)[delta > 0 ? 'next' : 'previous'];
    if (!target || moving) return;
    if (reducedMotion.matches) { render(target); return; }
    moving = true;
    const parts = [art, scroller];
    const far = (i) => SLIDE.distance * (i === 0 ? 1.6 : 1);
    await slide(parts, (i) => [{ transform: 'none', opacity: 1 }, { transform: `translateX(${-delta * far(i)}px)`, opacity: 0 }], SLIDE.out, 'cubic-bezier(0.37, 0, 0.63, 1)');
    render(target);
    await slide(parts, (i) => [{ transform: `translateX(${delta * far(i)}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], SLIDE.in, 'cubic-bezier(0.2, 0.9, 0.1, 1)');
    parts.forEach((part) => part.getAnimations().forEach((animation) => animation.cancel()));
    moving = false;
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
  // Left and right step between fighters unless a control that owns the arrows has focus.
  dialog.addEventListener('keydown', (event) => {
    const delta = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!delta || event.altKey || event.ctrlKey || event.metaKey || event.target.closest(ARROW_KEYS_OWNED)) return;
    event.preventDefault();
    go(delta);
  });
  previous.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  dialog.querySelector('.dossier__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { onClose?.(); if (current) triggerOf?.(current.fighter)?.focus(); });
  return { open };
}
