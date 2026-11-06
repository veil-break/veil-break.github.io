import { expect, test } from 'bun:test';
import { createIcosahedron, createShards, hexagonScale, rotateVertex } from '../scripts/shatter-geometry.js';

test('fragments form a closed 20-face icosahedron, with two faces per edge', () => {
  const { vertices, faces } = createIcosahedron();
  expect(vertices.length).toBe(12);
  expect(faces.length).toBe(20);
  const edges = new Map();
  for (const face of faces) {
    for (let i = 0; i < 3; i++) {
      const key = [face[i], face[(i + 1) % 3]].sort((a, b) => a - b).join(',');
      edges.set(key, (edges.get(key) || 0) + 1);
    }
  }
  expect(edges.size).toBe(30);
  expect([...edges.values()].every((count) => count === 2)).toBe(true);
  for (const vertex of vertices) expect(Math.hypot(...vertex)).toBeCloseTo(1);
});

test('hexagon accelerates toward the viewer and stops growing at fracture', () => {
  expect(hexagonScale(0)).toBe(1);
  const early = hexagonScale(0.1) - hexagonScale(0.05);
  const late = hexagonScale(0.3) - hexagonScale(0.25);
  expect(late).toBeGreaterThan(early * 5);
  expect(hexagonScale(0.34)).toBe(hexagonScale(1));
  expect(Number.isFinite(hexagonScale(1))).toBe(true);
});

test('shards are deterministic and rotation preserves geometry', () => {
  expect(createShards()).toEqual(createShards());
  for (const vertex of createIcosahedron().vertices) {
    expect(Math.hypot(...rotateVertex(vertex, 1.3, 2.7))).toBeCloseTo(1);
  }
});
