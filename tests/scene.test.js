import { describe, expect, test } from 'bun:test';
import { brokenRoof, fracture, LAYERS, shards, skyline, whaleFin, whaleOutline, whaleProfile, windows } from '../scripts/landing/scene-field.js';

describe('city', () => {
  test('every layer spans the width with heights inside its band, the same way twice', () => {
    for (const spec of Object.values(LAYERS)) {
      const city = skyline(spec);
      expect(city).toEqual(skyline(spec));
      expect(city).toHaveLength(spec.count);
      expect(city[0].x).toBeLessThanOrEqual(0);
      expect(city.at(-1).x + city.at(-1).width).toBeGreaterThanOrEqual(1);
      for (const b of city) {
        expect(b.height).toBeGreaterThanOrEqual(spec.min);
        expect(b.height).toBeLessThanOrEqual(spec.max);
        expect(['flat', 'stepped', 'spire', 'broken']).toContain(b.roof);
      }
    }
  });
  test('only the ruins burn', () => {
    expect(skyline(LAYERS.far).some((b) => b.fire)).toBe(false);
    expect(skyline(LAYERS.near).some((b) => b.fire)).toBe(true);
  });
  test('roofs and windows stay inside their building', () => {
    const roof = brokenRoof(3);
    expect(roof[0][0]).toBe(0);
    expect(roof.at(-1)[0]).toBe(1);
    for (const [c, r] of windows(9, 6, 10, 0.3)) {
      expect(c).toBeLessThan(6);
      expect(r).toBeLessThan(10);
    }
    expect(windows(9, 6, 10, 0)).toEqual([]);
  });
});

describe('the broken veil', () => {
  test('radial cracks leave the impact and run off screen; panes are quads near it', () => {
    const { cracks, arcs, panes } = fracture();
    expect(cracks).toHaveLength(15);
    for (const crack of cracks) {
      expect(Math.hypot(...crack[0])).toBeLessThan(0.05);
      expect(Math.hypot(...crack.at(-1))).toBeGreaterThan(1);
    }
    expect(arcs.length).toBeGreaterThan(20);
    expect(panes.length).toBeGreaterThan(0);
    for (const pane of panes) {
      expect(pane).toHaveLength(4);
      expect(Math.max(...pane.map((p) => Math.hypot(...p)))).toBeLessThan(0.3);
    }
    expect(fracture()).toEqual(fracture());
  });
  test('shards are small convex outlines spread over depth', () => {
    const field = shards();
    expect(field).toHaveLength(36);
    for (const s of field) {
      expect(s.outline.length).toBeGreaterThanOrEqual(4);
      expect(s.outline.length).toBeLessThanOrEqual(6);
      expect(s.depth).toBeGreaterThanOrEqual(0);
      expect(s.depth).toBeLessThan(1);
    }
  });
});

describe('sky whales', () => {
  test('the body is thickest behind the head and thins to the tail stock', () => {
    const [front] = whaleProfile(0.25);
    expect(front).toBeGreaterThan(whaleProfile(0.05)[0]);
    expect(front).toBeGreaterThan(whaleProfile(0.8)[0] * 3);
    expect(whaleProfile(0.2)[1]).toBeGreaterThan(whaleProfile(0.2)[0]);
  });
  test('the outline runs snout to flukes at every phase and stays finite', () => {
    for (const phase of [0, 1, 2.5, 4]) {
      const outline = whaleOutline(phase);
      const xs = outline.map(([x]) => x);
      expect(Math.min(...xs)).toBeCloseTo(0, 5);
      expect(Math.max(...xs)).toBeGreaterThan(0.95);
      expect(outline.flat().every(Number.isFinite)).toBe(true);
      expect(whaleFin(phase)).toHaveLength(4);
    }
  });
});
