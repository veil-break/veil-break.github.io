/**
 * Pure, deterministic geometry for the landing backdrop: the fractured veil, the megastructure city, floating
 * obsidian shards and the sky whales. Everything is normalised (0..1) or in local units; the renderer scales it.
 * No DOM, so it is tested directly.
 */
import { noise } from '../shatter-geometry.js';

/** City layers, back to front: a hazy megastructure line, a lit mid-city, and the burning ruins in front. */
export const LAYERS = {
  far: { seed: 11, count: 30, min: 0.26, max: 0.62, spire: 0.45, broken: 0.05, windows: 0.06, bridges: 2 },
  mid: { seed: 23, count: 22, min: 0.14, max: 0.36, spire: 0.2, broken: 0.15, windows: 0.22, bridges: 0 },
  near: { seed: 37, count: 12, min: 0.05, max: 0.17, spire: 0, broken: 0.85, windows: 0, bridges: 0, fires: 0.6 },
};

/**
 * Buildings filling 0..1 across, heights as a fraction of the viewport height. Each carries its roof (flat, stepped,
 * spire or a broken jag), a window seed and, in the ruins, an optional fire.
 */
export function skyline({ seed, count, min, max, spire, broken, fires = 0 }) {
  const widths = Array.from({ length: count }, (_, i) => 0.6 + noise(i, seed) * 1.4);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = -0.02;
  return widths.map((w, i) => {
    const width = (w / total) * 1.04;
    const roll = noise(i, seed + 1);
    const building = {
      x,
      width,
      height: min + Math.pow(noise(i, seed + 2), 1.3) * (max - min),
      roof: roll < broken ? 'broken' : roll < broken + spire ? 'spire' : noise(i, seed + 3) < 0.5 ? 'stepped' : 'flat',
      windows: seed * 1000 + i,
      fire: noise(i, seed + 4) < fires ? 0.3 + noise(i, seed + 5) * 0.7 : 0,
    };
    x += width;
    return building;
  });
}

/** A jagged roof line for a broken building: [dx, dy] pairs across its width, dy as a fraction of its height. */
export function brokenRoof(seed, points = 7) {
  return Array.from({ length: points + 1 }, (_, i) => [i / points, (noise(i, seed) - 0.3) * 0.35 * (i % 2 ? 1 : 0.4)]);
}

/** Lit windows in a building: a grid of [column, row] cells that are on. */
export function windows(seed, columns, rows, density) {
  const lit = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) if (noise(c + r * 97, seed) < density) lit.push([c, r, noise(c, seed + r) < 0.12 ? 'cool' : 'warm']);
  return lit;
}

/**
 * The broken veil: radial cracks out of one impact point, ring fractures spanning neighbouring radials, and a few
 * panes knocked out entirely so light leaks through. Units: 1 = the larger viewport side, origin at the impact.
 */
export function fracture(seed = 5, radials = 15, rings = [0.05, 0.1, 0.17, 0.27, 0.41, 0.6]) {
  const angles = Array.from({ length: radials }, (_, i) => ((i + (noise(i, seed) - 0.5) * 0.7) / radials) * Math.PI * 2);
  const radialAt = (i, r) => {
    const a = angles[i % radials] + (noise(i, Math.round(r * 100) + seed) - 0.5) * 0.08;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };
  const cracks = angles.map((_, i) => [0.012, ...rings, 1.4].map((r) => radialAt(i, r)));
  const arcs = [];
  const panes = [];
  rings.forEach((r, k) => {
    for (let i = 0; i < radials; i++) {
      if (noise(i + k * 31, seed + 9) < 0.62) arcs.push([radialAt(i, r), radialAt(i + 1, r * (0.92 + noise(i, k + seed) * 0.16))]);
      if (k < 3 && noise(i + k * 17, seed + 13) < 0.16) {
        panes.push([radialAt(i, r), radialAt(i + 1, r), radialAt(i + 1, rings[k + 1]), radialAt(i, rings[k + 1])]);
      }
    }
  });
  return { cracks, arcs, panes };
}

/** Floating obsidian shards: convex 4–6 point polygons that rise slowly and turn; depth 0 (far) .. 1 (near). */
export function shards(count = 36, seed = 61) {
  return Array.from({ length: count }, (_, i) => {
    const points = 4 + Math.floor(noise(i, seed) * 3);
    const outline = Array.from({ length: points }, (_, p) => {
      const a = (p / points) * Math.PI * 2 + (noise(p, i + seed) - 0.5) * 0.6;
      const r = p % 2 ? 0.45 + noise(p, i + seed + 1) * 0.3 : 0.8 + noise(p, i + seed + 2) * 0.4;
      return [Math.cos(a) * r * 0.62, Math.sin(a) * r];
    });
    return {
      x: noise(i, seed + 3),
      y: noise(i, seed + 4),
      depth: Math.pow(noise(i, seed + 5), 1.6),
      size: 0.6 + noise(i, seed + 6) * 0.8,
      angle: noise(i, seed + 7) * Math.PI * 2,
      spin: (noise(i, seed + 8) - 0.5) * 0.25,
      rise: 0.004 + noise(i, seed + 9) * 0.012,
      outline,
    };
  });
}

/** Upper and lower half-thickness of the whale's body at x (0 = snout, 0.86 = tail stock), in body lengths. */
export function whaleProfile(x) {
  const t = Math.max(0, Math.min(1, x));
  const front = Math.pow(Math.sin(Math.min(1, t / 0.24) * Math.PI / 2), 0.62);
  const back = 1 - Math.pow(Math.max(0, t - 0.24) / 0.62, 1.5) * 0.9;
  const upper = Math.max(0.01, 0.085 * front * back);
  const lower = upper * (t < 0.45 ? 1.25 : 1);
  return [upper, lower];
}

/**
 * The whale as one closed outline in local units (length 1, snout at x 0), swimming: the spine undulates more
 * towards the tail and the flukes follow the tail stock. phase is in radians.
 */
export function whaleOutline(phase, samples = 28) {
  const spine = (x) => Math.sin(phase + x * Math.PI * 1.25) * 0.022 * x * x;
  const top = [];
  const bottom = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * 0.86;
    const [upper, lower] = whaleProfile(x);
    const y = spine(x);
    const dorsal = x > 0.58 && x < 0.66 ? Math.sin(((x - 0.58) / 0.08) * Math.PI) * 0.018 : 0;
    top.push([x, y - upper - dorsal]);
    bottom.push([x, y + lower]);
  }
  // A swallowtail of flukes behind the tail stock, swinging with it: upper lobe, notch, lower lobe.
  const tail = [0.86, spine(0.86)];
  const swing = Math.cos(phase + 0.86 * Math.PI * 1.25) * 0.3;
  const lobe = [[0.004, 0.011], [0.05, 0.028], [0.12, 0.094], [0.138, 0.086], [0.104, 0.034], [0.088, 0.004]];
  const turn = ([x, y]) => [tail[0] + x * Math.cos(swing) - y * Math.sin(swing), tail[1] + x * Math.sin(swing) + y * Math.cos(swing)];
  const flukes = [...lobe.map(([x, y]) => turn([x, -y])), ...lobe.slice().reverse().map(([x, y]) => turn([x, y]))];
  return [...top, ...flukes, ...bottom.reverse()];
}

/** The pectoral fin: a long swept blade under the throat (humpback-like), as a closed polygon. */
export function whaleFin(phase) {
  const sweep = 0.5 + Math.sin(phase * 0.8) * 0.08;
  const root = [0.27, whaleProfile(0.27)[1] * 0.8];
  const tip = [root[0] + Math.cos(sweep) * 0.26, root[1] + Math.sin(sweep) * 0.26];
  return [root, [root[0] + 0.06, root[1] - 0.005], tip, [root[0] + 0.02, root[1] + 0.03]];
}
