import { createIcosahedron, createShards, hexagonScale, rotateVertex } from './shatter-geometry.js';

const mesh = createIcosahedron();
const shards = createShards();
const vertices = mesh.vertices.map(() => [0, 0, 0]);
const faces = mesh.faces.map((indices) => ({ indices, depth: 0 }));
const sortDepth = (a, b) => a.depth - b.depth;
const palette = ['143, 240, 207', '192, 132, 252', '255, 64, 160'];

/** Match the authored SVG's centered 1920×1080 hex, then rush and fracture it. */
export function drawHexShatter(ctx, progress, width, height) {
  const fit = Math.min(width / 1920, height / 1080);
  const radius = 519 * fit;
  const scale = hexagonScale(progress);
  const fracture = Math.max(0, (progress - 0.34) / 0.66);
  ctx.save();
  ctx.translate(width / 2, height / 2);

  if (fracture === 0) {
    ctx.strokeStyle = `rgba(250, 238, 244, ${0.42 + progress})`;
    ctx.lineWidth = 1 + progress * 5;
    ctx.shadowColor = '#8ff0cf';
    ctx.shadowBlur = progress * 24;
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const angle = (i * 60 - 60) * Math.PI / 180;
      const x = Math.cos(angle) * radius * scale;
      const y = Math.sin(angle) * radius * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  } else {
    const fade = Math.max(0, 1 - fracture ** 2);
    for (const shard of shards) {
      const camera = 1 / Math.max(0.18, 1 - fracture ** 2 * (1.3 + shard.depth));
      const distance = radius * scale * (1 + fracture * shard.speed);
      const x = shard.x * distance * camera;
      const y = shard.y * distance * camera;
      if (Math.abs(x) > width || Math.abs(y) > height) continue;
      const size = shard.size * fit * camera * (1 + fracture);
      for (let i = 0; i < vertices.length; i++) {
        rotateVertex(mesh.vertices[i], shard.spin + fracture * 5, shard.spin + fracture * shard.speed * 8, vertices[i]);
      }
      for (const face of faces) {
        face.depth = (vertices[face.indices[0]][2] + vertices[face.indices[1]][2] + vertices[face.indices[2]][2]) / 3;
      }
      faces.sort(sortDepth);
      for (const face of faces) {
        const light = (face.depth + 1) / 2;
        ctx.beginPath();
        face.indices.forEach((index, i) => {
          const vertex = vertices[index];
          const px = x + vertex[0] * size;
          const py = y + vertex[1] * size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(${palette[shard.tint]}, ${(0.06 + light * 0.24) * fade})`;
        ctx.strokeStyle = `rgba(${palette[shard.tint]}, ${(0.18 + light * 0.65) * fade})`;
        ctx.lineWidth = 0.7;
        ctx.fill();
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}
// perf: 42 shared 20-face meshes, finite handoff only; no WebGL dependency.
