import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Invariants of the synced outputs (tools/sync.py): every path the pages reference exists and the roster is whole.
const SITE = join(import.meta.dir, '..');
const read = (path) => JSON.parse(readFileSync(join(SITE, path), 'utf8'));
const roster = read('data/roster.json');
const exists = (path) => existsSync(join(SITE, path));

describe('roster.json', () => {
  test('names its producer release and commit', () => {
    expect(roster.source.repository).toBe('veil-break/characters');
    expect(roster.source.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(roster.source.commit).toMatch(/^[0-9a-f]{40}$/);
  });
  test('holds unique fighters whose class counts add up', () => {
    const ids = roster.fighters.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(roster.classes.map((c) => c.id)).toEqual(['breaker', 'striker', 'bastion', 'operator']);
    expect(roster.classes.reduce((sum, c) => sum + c.count, 0)).toBe(ids.length);
  });
  test('every fighter carries a kit status, four skills and existing media', () => {
    for (const fighter of roster.fighters) {
      expect(['authored', 'hypothesis']).toContain(fighter.kit);
      expect(fighter.skills.map((s) => s.slot)).toEqual(['basic', 'active', 'signature', 'passive']);
      for (const path of [...Object.values(fighter.media), ...fighter.skills.map((s) => s.icon)]) expect(exists(path)).toBe(true);
      expect(exists(`characters/data/${fighter.id}.json`)).toBe(true);
    }
    for (const entry of roster.classes) expect(exists(entry.icon)).toBe(true);
  });
  test('the progression budget is the producer’s', () => {
    expect(Object.keys(roster.progression).sort()).toEqual(['augmentedRank', 'budget', 'maximumPerSlot', 'transcendentRank']);
  });
});

test('the vendored design-system kit is complete', () => {
  const kit = read('vendor/veilbreak/gui/source.json');
  expect(kit.package).toBe('com.veilbreak.gui');
  for (const file of ['tokens.css', 'veilbreak.js']) expect(exists(`vendor/veilbreak/gui/${file}`)).toBe(true);
  const fonts = [...readFileSync(join(SITE, 'vendor/veilbreak/gui/tokens.css'), 'utf8').matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
  expect(fonts.length).toBeGreaterThan(0);
  for (const font of fonts) expect(exists(`vendor/veilbreak/gui/${font}`)).toBe(true);
});

test('per-fighter records are the producer record plus its canonical module', () => {
  const detail = read(`characters/data/${roster.fighters[0].id}.json`);
  expect(detail.record.id).toBe(roster.fighters[0].id);
  expect(detail.module.id).toBe(roster.fighters[0].id);
});
