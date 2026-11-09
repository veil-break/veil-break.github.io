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
