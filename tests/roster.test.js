import { describe, expect, test } from 'bun:test';
import { assetUrl, countBy, filterFighters, matches, pickSquad, seeded, shuffle, skillMeta, statScale, step } from '../scripts/lib/roster.js';

const fighter = (id, role, kit = 'authored', extra = {}) => ({
  id, name: id[0].toUpperCase() + id.slice(1), code: id.slice(0, 2).toUpperCase(), role, kit, rarity: 'epic', callsign: `${id} call`,
  identity: `${id} identity`, weapon: `${id} weapon`, skills: [{ slot: 'basic', name: `${id} bolt` }], stats: { hp: 1000, armor: 10, stability: 100, moveSpeed: 400 }, ...extra,
});
const roster = [fighter('aria', 'striker'), fighter('rook', 'breaker'), fighter('zinnia', 'operator', 'hypothesis'), fighter('aegis', 'bastion', 'authored', { stats: { hp: 1500, armor: 30, stability: 150, moveSpeed: 350 } })];

describe('asset urls', () => {
  test('accept site-relative producer paths under a root', () => {
    expect(assetUrl('../', 'characters/media/aria/face.webp')).toBe('../characters/media/aria/face.webp');
  });
  test('refuse schemes, absolute paths, parent steps and non-strings', () => {
    for (const path of ['javascript:alert(1)', 'https://x.test/a.png', '/etc/passwd', 'a/../../b', 'a\\b', '', null, 42]) expect(assetUrl('./', path)).toBe('');
  });
});

describe('filters', () => {
  test('match name, callsign, weapon and skill names case-insensitively', () => {
    expect(filterFighters(roster, { query: 'ROOK' }).map((f) => f.id)).toEqual(['rook']);
    expect(filterFighters(roster, { query: 'zinnia bolt' }).map((f) => f.id)).toEqual(['zinnia']);
    expect(filterFighters(roster, { query: '  ' })).toHaveLength(4);
  });
  test('class and kit narrow together', () => {
    expect(filterFighters(roster, { role: 'operator', kit: 'hypothesis' }).map((f) => f.id)).toEqual(['zinnia']);
    expect(matches(roster[0], { role: 'operator' })).toBe(false);
  });
  test('counts and the stat scale come from the roster itself', () => {
    expect(countBy(roster, 'kit')).toEqual({ authored: 3, hypothesis: 1 });
    expect(statScale(roster)).toEqual({ hp: 1500, armor: 30, stability: 150, moveSpeed: 400 });
  });
});

describe('skill readout', () => {
  test('converts 30 Hz ticks to seconds and centimetres to metres', () => {
    expect(skillMeta({ cost: 18, cooldown: 150, windup: 22, range: 900 })).toBe('18 power · 5.0 s cooldown · 0.73 s windup · 9.0 m range');
    expect(skillMeta({ cost: 0, cooldown: 0, windup: 0, range: 0 })).toBe('free');
    expect(skillMeta(undefined)).toBe('');
  });
});

describe('squad and carousel', () => {
  test('seeded shuffles are permutations and repeatable', () => {
    const items = [...Array(20).keys()];
    const a = shuffle(items, seeded(7));
    expect([...a].sort((x, y) => x - y)).toEqual(items);
    expect(shuffle(items, seeded(7))).toEqual(a);
    expect(shuffle(items, seeded(8))).not.toEqual(a);
  });
  test('a squad holds distinct classes', () => {
    for (let seed = 1; seed < 50; seed++) {
      const squad = pickSquad(roster, seeded(seed), 3);
      expect(squad).toHaveLength(3);
      expect(new Set(squad.map((f) => f.role)).size).toBe(3);
    }
  });
  test('carousel steps wrap both ways', () => {
    expect(step(0, -1, 47)).toBe(46);
    expect(step(46, 1, 47)).toBe(0);
    expect(step(3, 0, 47)).toBe(3);
  });
});
