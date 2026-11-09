import { expect, test } from 'bun:test';
import { breachPalette, rgbTriplet } from '../scripts/lib/color.js';
import { createEmbers, createRain, particleBudget, riftPoints, wrap } from '../scripts/landing/veil-field.js';

test('token hex colours convert for canvas rgba strings', () => {
  expect(rgbTriplet('#ff40a0')).toBe('255, 64, 160');
  expect(rgbTriplet('#faeef424')).toBe('250, 238, 244');
  expect(rgbTriplet('#fff')).toBe('255, 255, 255');
  expect(rgbTriplet('var(--x)')).toBeNull();
});

test('the breach palette reads every colour from tokens', () => {
  const read = (name) => ({ '--signal-pink': '#ff40a0' }[name] || '#000000');
  const palette = breachPalette(read);
  expect(Object.keys(palette)).toEqual(['ground', 'ink', 'ally', 'power', 'pink', 'red', 'cyan', 'ember']);
  expect(palette.pink).toEqual({ hex: '#ff40a0', rgb: '255, 64, 160' });
});

test('particle budgets scale with area and stay bounded', () => {
  expect(particleBudget(390, 844).rain).toBeGreaterThanOrEqual(60);
  expect(particleBudget(5120, 2880)).toEqual({ rain: 260, embers: 70 });
});

test('fields are deterministic and normalised', () => {
  expect(createRain(30)).toEqual(createRain(30));
  for (const p of [...createRain(80), ...createEmbers(40)]) {
    expect(p.x).toBeGreaterThanOrEqual(0);
    expect(p.x).toBeLessThan(1);
    expect(p.y).toBeGreaterThanOrEqual(0);
    expect(p.y).toBeLessThan(1);
  }
  expect(wrap(1.25)).toBeCloseTo(0.25);
  expect(wrap(-0.25)).toBeCloseTo(0.75);
});

test('the rift spans top to bottom, tapers at both ends and flickers per frame bucket', () => {
  const points = riftPoints(0, 0.5);
  expect(points[0][1]).toBe(0);
  expect(points.at(-1)[1]).toBe(1);
  expect(points[0][2]).toBeCloseTo(0);
  expect(riftPoints(10, 0.5)).toEqual(riftPoints(80, 0.5));
  expect(riftPoints(10, 0.5)).not.toEqual(riftPoints(100, 0.5));
});
