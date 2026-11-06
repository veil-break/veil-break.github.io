/** Deterministic geometry and camera math, independent of the canvas/DOM. */
const PHI = (1 + Math.sqrt(5)) / 2;
const LENGTH = Math.hypot(1, PHI);

export function createIcosahedron() {
  const vertices = [];
  for (const a of [-1, 1]) {
    for (const b of [-PHI, PHI]) {
      vertices.push([0, a / LENGTH, b / LENGTH], [a / LENGTH, b / LENGTH, 0], [b / LENGTH, 0, a / LENGTH]);
    }
  }
  const faces = [];
  const edge = 2 / LENGTH;
  const adjacent = (a, b) => Math.abs(Math.hypot(...a.map((v, i) => v - b[i])) - edge) < 0.00001;
  for (let a = 0; a < vertices.length; a++) {
    for (let b = a + 1; b < vertices.length; b++) {
      for (let c = b + 1; c < vertices.length; c++) {
        if (adjacent(vertices[a], vertices[b]) && adjacent(vertices[b], vertices[c]) && adjacent(vertices[a], vertices[c])) faces.push([a, b, c]);
      }
    }
  }
  return { vertices, faces };
}

export function noise(seed, channel = 0) {
  const value = Math.sin(seed * 127.1 + channel * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function hexagonScale(progress) {
  const rush = Math.min(1, Math.max(0, progress / 0.34));
  return 1 / (1 - 0.4 * rush ** 3);
}

export function createShards(count = 42) {
  return Array.from({ length: count }, (_, i) => {
    const edge = i % 6;
    const angle = (edge * 60 - 60) * Math.PI / 180;
    const next = angle + Math.PI / 3;
    const along = noise(i, 1);
    return {
      x: Math.cos(angle) * (1 - along) + Math.cos(next) * along,
      y: Math.sin(angle) * (1 - along) + Math.sin(next) * along,
      size: 9 + noise(i, 2) * 24,
      speed: 0.5 + noise(i, 3) * 1.3,
      spin: noise(i, 4) * Math.PI * 2,
      depth: noise(i, 5) * 0.3,
      tint: i % 3,
    };
  });
}

export function rotateVertex(vertex, angleX, angleY, target = [0, 0, 0]) {
  const [x, y, z] = vertex;
  const y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
  const z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
  target[0] = x * Math.cos(angleY) + z1 * Math.sin(angleY);
  target[1] = y1;
  target[2] = z1 * Math.cos(angleY) - x * Math.sin(angleY);
  return target;
}
