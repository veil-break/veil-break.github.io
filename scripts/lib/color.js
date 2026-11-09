/** Token colours for canvas code: canvases cannot read var(--x), so they resolve the kit tokens once per play. */

export function token(name, root = document.documentElement) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

/** '#rgb', '#rrggbb' or '#rrggbbaa' → 'r, g, b' for rgba() strings; anything else → null. */
export function rgbTriplet(hex) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(String(hex).trim());
  if (!match) return null;
  let digits = match[1];
  if (digits.length === 3) digits = [...digits].map((d) => d + d).join('');
  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)).join(', ');
}

/** The breach palette, from the kit: ground, ink, ally text, power, signal pink, the two glitch channels. */
export function breachPalette(read = token) {
  const names = { ground: '--panel-solid', ink: '--text', ally: '--ally-text', power: '--power', pink: '--signal-pink', red: '--glitch-red', cyan: '--glitch-cyan', ember: '--ember-400' };
  return Object.fromEntries(Object.entries(names).map(([key, name]) => {
    const hex = read(name);
    return [key, { hex, rgb: rgbTriplet(hex) }];
  }));
}
