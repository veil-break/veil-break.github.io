/** Pure, deterministic particle fields for the hero's veil canvas (normalised 0..1 space). No DOM. */
import { noise } from '../shatter-geometry.js';

/** Particle counts scale with the viewport area and stay inside a fixed budget. */
export function particleBudget(width, height) {
  const area = (width * height) / (1440 * 900);
  return { rain: Math.round(Math.min(260, Math.max(60, 200 * area))), embers: Math.round(Math.min(70, Math.max(18, 48 * area))) };
}

export function createRain(count) {
  return Array.from({ length: count }, (_, i) => ({
    x: noise(i, 31),
    y: noise(i, 32),
    length: 0.02 + noise(i, 33) * 0.06,
    speed: 0.55 + noise(i, 34) * 0.9,
    alpha: 0.06 + noise(i, 35) * 0.22,
    tint: noise(i, 36) < 0.12 ? (i % 2 ? 'cyan' : 'pink') : 'ink',
  }));
}

export function createEmbers(count) {
  return Array.from({ length: count }, (_, i) => ({
    x: noise(i, 41),
    y: noise(i, 42),
    size: 1 + noise(i, 43) * 2.5,
    speed: 0.03 + noise(i, 44) * 0.08,
    sway: noise(i, 45) * Math.PI * 2,
    alpha: 0.25 + noise(i, 46) * 0.6,
  }));
}

/** Advance a normalised coordinate and wrap it into 0..1. */
export function wrap(value) {
  return value - Math.floor(value);
}

/**
 * The rift: a jagged vertical tear around x = 0.5. The jag re-rolls every `frameMs` so it flickers like a bad
 * signal rather than wobbling smoothly; `open` (0..1) widens the tear.
 */
export function riftPoints(time, open, segments = 22, frameMs = 90) {
  const tick = Math.floor(time / frameMs);
  return Array.from({ length: segments + 1 }, (_, i) => {
    const y = i / segments;
    const taper = Math.sin(Math.PI * Math.min(1, Math.max(0, (y - 0.02) / 0.96)));
    const jag = (noise(i, tick) - 0.5) * 0.05 + (noise(i, 7) - 0.5) * 0.03;
    return [0.5 + jag * (0.4 + open), y, taper * (0.004 + open * 0.02)];
  });
}
