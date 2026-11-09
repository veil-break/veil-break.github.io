/**
 * Native disclosure tree for raw producer JSON. Children build lazily on first open; keys and values only ever
 * enter textContent. No framework.
 */
import { element } from '../lib/dom.js';

const jsonType = (value) => (value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value);
const primitive = (value) => value === null || typeof value !== 'object';
const inlineArray = (value) => Array.isArray(value) && value.length > 0 && value.length <= 6 && value.every(primitive) && JSON.stringify(value).length <= 48;
const scalar = (value) => element('span', `jv-scalar jv-${jsonType(value)}`, JSON.stringify(value));

function node(name, value, depth = 0) {
  const type = jsonType(value);
  const leaf = primitive(value);
  const entries = leaf ? [] : Object.entries(value);
  const inline = inlineArray(value);
  const collapsible = !leaf && entries.length > 0 && !inline;
  const root = element(collapsible ? 'details' : 'div', collapsible ? 'jv-node' : 'jv-row');
  const row = collapsible ? element('summary', 'jv-row') : root;
  row.append(element('span', collapsible ? 'jv-caret' : 'jv-caret-gap', collapsible ? '▸' : ''));
  if (name !== undefined) row.append(element('span', 'jv-key', typeof name === 'number' ? String(name) : JSON.stringify(name)), element('span', 'jv-punct', ': '));
  if (leaf) row.append(scalar(value));
  else if (inline) {
    row.append(element('span', 'jv-punct', '[ '));
    value.forEach((item, i) => { row.append(scalar(item)); if (i < value.length - 1) row.append(element('span', 'jv-punct', ', ')); });
    row.append(element('span', 'jv-punct', ' ]'));
  } else {
    const [open, close] = type === 'array' ? ['[', ']'] : ['{', '}'];
    row.append(element('span', 'jv-punct', open + (entries.length ? '' : close)));
    if (collapsible) {
      row.append(element('span', 'jv-preview', ` … ${entries.length} ${close}`));
      root.append(row);
      let built = false;
      root.build = () => {
        if (built) return;
        built = true;
        const children = element('div', 'jv-children');
        entries.forEach(([key, item]) => children.append(node(type === 'array' ? Number(key) : key, item, depth + 1)));
        children.append(element('div', 'jv-row jv-close', close));
        root.append(children);
      };
      root.addEventListener('toggle', () => { if (root.open) root.build(); });
      if (depth === 0) { root.build(); root.open = true; }
    }
  }
  return root;
}

function expandAll(tree) {
  for (const child of tree.children) {
    if (child.tagName === 'DETAILS') { child.build?.(); child.open = true; }
    expandAll(child);
  }
}

function download(data, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const anchor = element('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function jsonViewer(data, filename = 'veilbreak.json') {
  const root = element('div', 'jv');
  const toolbar = element('div', 'jv-toolbar hud');
  const tree = element('div', 'jv-tree');
  const actions = element('div', 'jv-actions');
  const status = element('span', 'jv-status');
  status.setAttribute('role', 'status');
  const buttons = [
    ['expand all', () => expandAll(tree)],
    ['collapse all', () => tree.querySelectorAll('details').forEach((d) => { d.open = false; })],
    ['copy', async () => {
      try { await navigator.clipboard.writeText(JSON.stringify(data, null, 2)); status.textContent = 'copied'; }
      catch { status.textContent = 'copy unavailable — use download'; }
    }],
    ['download', () => download(data, filename)],
  ];
  for (const [label, action] of buttons) {
    const button = element('button', 'jv-button', label);
    button.type = 'button';
    button.addEventListener('click', action);
    actions.append(button);
  }
  actions.append(status);
  toolbar.append(element('span', '', 'json'), actions);
  tree.append(node(undefined, data));
  root.append(toolbar, tree);
  return root;
}
