/** DOM helpers shared by both pages. Source strings only ever enter textContent. */

export function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}

/** Producer text marks a status or term as *word*; render those runs as <em>, everything as text. */
export function rich(text, tag = 'p', className) {
  const node = element(tag, className);
  String(text ?? '').split(/(\*[^*\n]+\*)/).forEach((part) => {
    if (/^\*[^*\n]+\*$/.test(part)) node.append(element('em', '', part.slice(1, -1)));
    else if (part) node.append(part);
  });
  return node;
}

/** A monochrome producer SVG painted through a CSS mask, so it takes any token colour. */
export function maskIcon(url, { label, size, tone, className = '' } = {}) {
  const node = element('span', `mask-icon ${className}`.trim());
  // Absolute: a url() inside a custom property resolves against the stylesheet that reads it, not the page.
  node.style.setProperty('--icon', `url("${new URL(url, document.baseURI).href}")`);
  if (size) node.style.setProperty('--icon-size', `${size}px`);
  if (tone) node.style.setProperty('--icon-tone', tone);
  if (label) { node.setAttribute('role', 'img'); node.setAttribute('aria-label', label); }
  else node.setAttribute('aria-hidden', 'true');
  return node;
}

export function image(src, alt, { className = '', loading = 'lazy', width, height } = {}) {
  const node = element('img', className);
  node.src = src;
  node.alt = alt;
  node.loading = loading;
  node.decoding = 'async';
  if (width) node.width = width;
  if (height) node.height = height;
  return node;
}

/**
 * VbSegmented on the web: a radio group of options, one on. Arrow keys move and select (roving tabindex);
 * set(value) changes it from outside without firing onChange.
 */
export function segmented({ label, options, value, onChange, className = '' }) {
  const group = element('div', `segmented shape ${className}`.trim());
  group.setAttribute('role', 'radiogroup');
  group.setAttribute('aria-label', label);
  const buttons = options.map((option) => {
    const button = element('button', 'segmented__option', option.label);
    button.type = 'button';
    button.dataset.value = String(option.value);
    button.setAttribute('role', 'radio');
    if (option.title) button.title = option.title;
    button.addEventListener('click', () => choose(button, true));
    return button;
  });
  function set(next) {
    for (const button of buttons) {
      const on = button.dataset.value === String(next);
      button.setAttribute('aria-checked', String(on));
      button.tabIndex = on ? 0 : -1;
    }
  }
  function choose(button, notify) {
    set(button.dataset.value);
    if (notify) onChange?.(button.dataset.value);
  }
  group.addEventListener('keydown', (event) => {
    const index = buttons.indexOf(document.activeElement);
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (index < 0 || !delta) return;
    event.preventDefault();
    const next = buttons[(index + delta + buttons.length) % buttons.length];
    next.focus();
    choose(next, true);
  });
  group.append(...buttons);
  set(value);
  return Object.assign(group, { set });
}
