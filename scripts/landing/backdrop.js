import { scenePalette } from '../lib/color.js';
import { noise } from '../shatter-geometry.js';
import { brokenRoof, fracture, LAYERS, shards as createShards, skyline, whaleFin, whaleOutline, windows } from './scene-field.js';
import { createEmbers, createRain, particleBudget, wrap } from './veil-field.js';

/** Where the veil broke (viewport fractions), and how far each layer drifts with the pointer and rises on scroll. */
const IMPACT = [0.5, 0.17];
const DEPTH = { sky: { drift: 0, rise: 24 }, far: { drift: 8, rise: 50 }, mid: { drift: 18, rise: 110 }, near: { drift: 34, rise: 190 } };
/** Offsets put both whales in frame at START; the big one crosses the sky in about three minutes. */
const WHALES = [
  { length: 0.56, y: 0.3, period: 170, offset: 0.36, alpha: 0.9, heading: -1, swim: 0.55, stars: 70 },
  { length: 0.3, y: 0.1, period: 120, offset: 0.434, alpha: 0.45, heading: 1, swim: 0.8, stars: 26 },
];
const START = 31.2;
/** The scene moves slowly; 30 fps halves the paint and compositing cost of a full-screen canvas for no visible loss. */
const FRAME_MS = 1000 / 30;

const rgba = (tone, alpha) => `rgba(${tone.rgb}, ${alpha})`;

function polygon(ctx, points, sx = 1, sy = sx) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x * sx, y * sy) : ctx.moveTo(x * sx, y * sy)));
  ctx.closePath();
}

/**
 * The landing's living backdrop, inspired by the veil breaking over a megastructure city: a fractured sky leaking
 * light, sky whales, obsidian shards rising into the breach, three layers of city with lit windows and burning ruins,
 * fog, embers and rain. Static layers render once per size into offscreen canvases; each frame composites them with
 * pointer and scroll parallax. It pauses in hidden tabs; reduced motion draws one still frame.
 */
export function createBackdrop(canvas, { motion }) {
  const ctx = canvas.getContext('2d');
  const view = { width: 0, height: 0, ratio: 1, pointer: 0, pointerTarget: 0, rise: 0, scrim: 0 };
  const caches = {};
  const field = { cracks: fracture(), shards: createShards(), rain: [], embers: [], fires: [] };
  let colors;
  let frame;
  let last = 0;
  let clock = 0;

  const offscreen = (width, height) => {
    const layer = document.createElement('canvas');
    layer.width = Math.round(width * view.ratio);
    layer.height = Math.round(height * view.ratio);
    const c = layer.getContext('2d');
    c.scale(view.ratio, view.ratio);
    return [layer, c];
  };

  function paintSky() {
    const { width: w, height: h } = view;
    const [layer, c] = offscreen(w, h + DEPTH.sky.rise);
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, colors.void.hex);
    sky.addColorStop(0.4, colors.night.hex);
    sky.addColorStop(0.66, colors.fog.hex);
    sky.addColorStop(0.84, rgba(colors.ember, 0.7));
    sky.addColorStop(1, rgba(colors.amber, 0.55));
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h + DEPTH.sky.rise);
    // The sun behind the city, low and warm, as in a sunset seen through broken glass.
    const sun = c.createRadialGradient(w * 0.5, h * 0.86, 0, w * 0.5, h * 0.86, w * 0.55);
    sun.addColorStop(0, rgba(colors.amber, 0.55));
    sun.addColorStop(0.25, rgba(colors.ember, 0.22));
    sun.addColorStop(1, rgba(colors.ember, 0));
    c.fillStyle = sun;
    c.fillRect(0, 0, w, h + DEPTH.sky.rise);
    // Light through the breach.
    const [ix, iy] = [IMPACT[0] * w, IMPACT[1] * h];
    const unit = Math.max(w, h);
    const glow = c.createRadialGradient(ix, iy, 0, ix, iy, unit * 0.5);
    glow.addColorStop(0, rgba(colors.ink, 0.55));
    glow.addColorStop(0.08, rgba(colors.lavender, 0.38));
    glow.addColorStop(0.3, rgba(colors.neon, 0.16));
    glow.addColorStop(1, rgba(colors.neon, 0));
    c.fillStyle = glow;
    c.fillRect(0, 0, w, h + DEPTH.sky.rise);
    // Knocked-out panes: brighter light where the veil is gone.
    c.save();
    c.translate(ix, iy);
    c.globalCompositeOperation = 'lighter';
    field.cracks.panes.forEach((pane, i) => {
      polygon(c, pane, unit);
      const pale = c.createLinearGradient(pane[0][0] * unit, pane[0][1] * unit, pane[2][0] * unit, pane[2][1] * unit);
      pale.addColorStop(0, rgba(i % 2 ? colors.pink : colors.cyan, 0.14));
      pale.addColorStop(0.6, rgba(colors.lavender, 0.03));
      pale.addColorStop(1, rgba(colors.lavender, 0));
      c.fillStyle = pale;
      c.fill();
      c.strokeStyle = rgba(colors.ink, 0.22);
      c.lineWidth = 1.2;
      c.stroke();
    });
    // The fracture web: radials and the rings between them, fading with distance from the impact.
    c.lineJoin = 'round';
    for (const crack of field.cracks.cracks) {
      c.beginPath();
      crack.forEach(([x, y], i) => (i ? c.lineTo(x * unit, y * unit) : c.moveTo(x * unit, y * unit)));
      const fade = c.createRadialGradient(0, 0, 0, 0, 0, unit * 0.9);
      fade.addColorStop(0, rgba(colors.ink, 0.55));
      fade.addColorStop(1, rgba(colors.ink, 0.04));
      c.strokeStyle = fade;
      c.lineWidth = 1;
      c.stroke();
    }
    for (const [[x1, y1], [x2, y2]] of field.cracks.arcs) {
      const distance = Math.hypot(x1, y1);
      c.strokeStyle = rgba(colors.ink, Math.max(0.03, 0.35 - distance * 0.5));
      c.lineWidth = 0.8;
      c.beginPath();
      c.moveTo(x1 * unit, y1 * unit);
      c.quadraticCurveTo(((x1 + x2) / 2) * unit * 0.97, ((y1 + y2) / 2) * unit * 0.97, x2 * unit, y2 * unit);
      c.stroke();
    }
    c.restore();
    return layer;
  }

  function paintCity(name) {
    const { width: w, height: h } = view;
    const spec = LAYERS[name];
    const { drift, rise } = DEPTH[name];
    const over = drift * 2;
    const height = h * (spec.max + 0.16) + rise;
    const [layer, c] = offscreen(w + over * 2, height);
    const base = height;
    const buildings = skyline(spec);
    // Atmospheric perspective: the far line is haze at the top and night at the foot; the ruins are all void.
    const body = c.createLinearGradient(0, base - h * spec.max, 0, base);
    if (name === 'far') { body.addColorStop(0, rgba(colors.fog, 0.9)); body.addColorStop(0.55, rgba(colors.night, 0.96)); body.addColorStop(1, colors.void.hex); }
    else if (name === 'mid') { body.addColorStop(0, colors.street.hex); body.addColorStop(1, colors.void.hex); }
    else { body.addColorStop(0, colors.void.hex); body.addColorStop(1, colors.void.hex); }
    const fires = [];
    buildings.forEach((b, i) => {
      const x = over + b.x * (w + over);
      const bw = b.width * (w + over) + 1;
      const bh = b.height * h;
      const top = base - bh;
      c.fillStyle = body;
      c.beginPath();
      c.moveTo(x, base);
      if (b.roof === 'broken') brokenRoof(b.windows).forEach(([dx, dy]) => c.lineTo(x + dx * bw, top + dy * bh));
      else if (b.roof === 'spire') {
        const tip = Math.min(h * 0.14, bh * (0.1 + noise(i, spec.seed + 6) * 0.16));
        c.lineTo(x, top); c.lineTo(x + bw * 0.38, top); c.lineTo(x + bw * 0.38, top - tip * 0.3); c.lineTo(x + bw * 0.48, top - tip * 0.35); c.lineTo(x + bw * 0.5, top - tip); c.lineTo(x + bw * 0.52, top - tip * 0.35); c.lineTo(x + bw * 0.62, top - tip * 0.3); c.lineTo(x + bw * 0.62, top); c.lineTo(x + bw, top);
      } else if (b.roof === 'stepped') {
        c.lineTo(x, top + bh * 0.08); c.lineTo(x + bw * 0.2, top + bh * 0.08); c.lineTo(x + bw * 0.2, top); c.lineTo(x + bw * 0.8, top); c.lineTo(x + bw * 0.8, top + bh * 0.05); c.lineTo(x + bw, top + bh * 0.05);
      } else { c.lineTo(x, top); c.lineTo(x + bw, top); }
      c.lineTo(x + bw, base);
      c.closePath();
      c.fill();
      // The breach rims every roof in its light.
      c.strokeStyle = rgba(colors.neon, name === 'far' ? 0.28 : 0.16);
      c.lineWidth = 1;
      c.beginPath(); c.moveTo(x, top); c.lineTo(x + bw, top); c.stroke();
      // Windows: a grid per building, mostly warm; the far line only glints.
      const cell = name === 'far' ? [5, 8] : name === 'mid' ? [7, 10] : [9, 12];
      const columns = Math.max(1, Math.floor((bw - 6) / cell[0]));
      const rows = Math.max(1, Math.floor((bh - 10) / cell[1]));
      for (const [col, row, kind] of windows(b.windows, columns, rows, spec.windows)) {
        c.fillStyle = rgba(kind === 'cool' ? colors.cool : colors.amber, name === 'far' ? 0.22 : 0.4 + noise(col, row) * 0.45);
        c.fillRect(x + 4 + col * cell[0], top + 8 + row * cell[1], cell[0] * 0.45, cell[1] * 0.4);
      }
      if (b.fire) fires.push({ x: x + bw * (0.3 + noise(i, 3) * 0.4) - over, y: top - (base - h), size: Math.max(bw, 40) * (0.7 + b.fire), heat: b.fire, seed: i });
    });
    // Sky bridges between the tallest far towers.
    for (let k = 0; k < spec.bridges; k++) {
      const order = buildings.map((b, i) => [b.height, i]).sort((a, b) => b[0] - a[0]);
      const [a, b] = [order[k * 2][1], order[k * 2 + 3][1]].sort((p, q) => p - q);
      const y = base - Math.min(buildings[a].height, buildings[b].height) * h * 0.82;
      const x1 = over + (buildings[a].x + buildings[a].width / 2) * (w + over);
      const x2 = over + (buildings[b].x + buildings[b].width / 2) * (w + over);
      c.fillStyle = rgba(colors.fog, 0.95);
      c.fillRect(x1, y, x2 - x1, Math.max(4, h * 0.008));
      c.fillStyle = rgba(colors.amber, 0.35);
      for (let x = x1 + 6; x < x2; x += 14) c.fillRect(x, y + 1, 3, 1.5);
    }
    // Ground light: the street burns in front, the city glows behind.
    const ground = c.createLinearGradient(0, base - h * 0.2, 0, base);
    ground.addColorStop(0, rgba(colors.fire, 0));
    ground.addColorStop(1, rgba(name === 'near' ? colors.fire : colors.ember, name === 'near' ? 0.32 : 0.14));
    c.fillStyle = ground;
    c.globalCompositeOperation = 'lighter';
    c.fillRect(0, base - h * 0.2, w + over * 2, h * 0.2);
    if (name === 'near') field.fires = fires;
    return { layer, over, height };
  }

  function build() {
    const box = canvas.getBoundingClientRect();
    view.width = box.width;
    view.height = box.height;
    view.ratio = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.round(view.width * view.ratio);
    canvas.height = Math.round(view.height * view.ratio);
    colors = scenePalette();
    caches.sky = paintSky();
    for (const name of ['far', 'mid', 'near']) caches[name] = paintCity(name);
    const budget = particleBudget(view.width, view.height);
    field.rain = createRain(Math.round(budget.rain * 0.8));
    field.embers = createEmbers(budget.embers);
  }

  function drawCity(name) {
    const { layer, over, height } = caches[name];
    const { drift, rise } = DEPTH[name];
    ctx.drawImage(layer, -over + view.pointer * drift, view.height - height + rise * (1 - view.rise), view.width + over * 2, height);
  }

  function drawWhale(spec, time) {
    const { width: w, height: h } = view;
    const length = Math.max(spec.length * w, spec.length * 900);
    const travel = w + length * 1.3;
    const progress = wrap(time / spec.period + spec.offset);
    const x = spec.heading < 0 ? w + length * 0.15 - progress * travel : -length * 1.15 + progress * travel;
    const y = spec.y * h + Math.sin(time / 9 + spec.offset * 6) * h * 0.012 - view.rise * DEPTH.sky.rise * 0.6;
    const phase = time * spec.swim;
    const outline = whaleOutline(phase);
    ctx.save();
    ctx.translate(x + view.pointer * 4, y);
    ctx.scale(spec.heading < 0 ? 1 : -1, 1);
    ctx.rotate(-0.1 + Math.sin(time / 11) * 0.025);
    ctx.globalAlpha = spec.alpha;
    const body = ctx.createLinearGradient(0, -length * 0.1, 0, length * 0.12);
    body.addColorStop(0, colors.night.hex);
    body.addColorStop(0.55, colors.body.hex);
    body.addColorStop(1, colors.fog.hex);
    ctx.fillStyle = body;
    polygon(ctx, whaleFin(phase), length);
    ctx.fill();
    polygon(ctx, outline, length);
    ctx.fill();
    // Rim light: the breach on its back, the burning city on its belly.
    const rim = ctx.createLinearGradient(0, -length * 0.1, 0, length * 0.12);
    rim.addColorStop(0, rgba(colors.lavender, 0.55));
    rim.addColorStop(0.45, rgba(colors.lavender, 0.05));
    rim.addColorStop(1, rgba(colors.ember, 0.7));
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = rim;
    ctx.stroke();
    // A body full of stars, the veil showing through it.
    ctx.clip();
    for (let i = 0; i < spec.stars; i++) {
      const sx = noise(i, 71) * 0.95;
      const sy = (noise(i, 72) - 0.5) * 0.2;
      ctx.fillStyle = rgba(i % 7 ? colors.ink : colors.pink, 0.25 + noise(i, 73) * 0.5 * (0.6 + 0.4 * Math.sin(time * 1.3 + i)));
      const size = 0.6 + noise(i, 74) * 1.4;
      ctx.fillRect(sx * length, sy * length, size, size);
    }
    ctx.restore();
  }

  function drawShards(time, from, to) {
    const { width: w, height: h } = view;
    const unit = Math.min(w, h) * 0.034;
    for (const shard of field.shards) {
      if (shard.depth < from || shard.depth >= to) continue;
      const y = (wrap(shard.y - shard.rise * time) * 1.3 - 0.15) * h - view.rise * shard.depth * 120;
      const x = shard.x * w + view.pointer * shard.depth * 40 + Math.sin(time / 4 + shard.angle) * 6;
      const size = unit * shard.size * (0.35 + shard.depth * 1.4);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shard.angle + shard.spin * time);
      ctx.globalAlpha = 0.55 + shard.depth * 0.45;
      polygon(ctx, shard.outline, size);
      const fill = ctx.createLinearGradient(-size, -size, size, size);
      fill.addColorStop(0, shard.depth < 0.3 ? colors.fog.hex : colors.body.hex);
      fill.addColorStop(0.45, colors.night.hex);
      fill.addColorStop(1, colors.void.hex);
      ctx.fillStyle = fill;
      ctx.fill();
      // Obsidian catches the breach on its upper edges only.
      const rim = ctx.createLinearGradient(0, -size, 0, size);
      rim.addColorStop(0, rgba(colors.lavender, 0.25 + shard.depth * 0.5));
      rim.addColorStop(0.5, rgba(colors.lavender, 0.04));
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1 + shard.depth;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(shard.outline[0][0] * size, shard.outline[0][1] * size);
      ctx.lineTo(0, 0);
      ctx.lineTo(shard.outline[2][0] * size, shard.outline[2][1] * size);
      ctx.strokeStyle = rgba(colors.ink, 0.06 + shard.depth * 0.12);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawFires(time) {
    const { drift, rise } = DEPTH.near;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const fire of field.fires) {
      const flicker = 0.75 + Math.sin(time * 9 + fire.seed) * 0.12 + Math.sin(time * 23 + fire.seed * 3) * 0.08;
      const x = fire.x + view.pointer * drift;
      const y = fire.y + rise * (1 - view.rise);
      const r = fire.size * flicker;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, rgba(colors.amber, 0.5 * fire.heat));
      glow.addColorStop(0.35, rgba(colors.fire, 0.28 * fire.heat));
      glow.addColorStop(1, rgba(colors.fire, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    ctx.restore();
  }

  function drawWeather(dt, time) {
    const { width: w, height: h } = view;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const ember of field.embers) {
      ember.y = wrap(ember.y - ember.speed * dt);
      const x = wrap(ember.x + Math.sin(time / 1.3 + ember.sway) * 0.01) * w;
      const y = (0.3 + ember.y * 0.7) * h;
      ctx.fillStyle = rgba(colors.fire, ember.alpha * ember.y);
      ctx.fillRect(x, y, ember.size, ember.size);
    }
    ctx.restore();
    ctx.lineWidth = 1;
    for (const drop of field.rain) {
      drop.y = wrap(drop.y + drop.speed * dt);
      drop.x = wrap(drop.x - drop.speed * dt * 0.12);
      const x = drop.x * w;
      const y = drop.y * h;
      ctx.strokeStyle = rgba(drop.tint === 'ink' ? colors.ink : colors[drop.tint], drop.alpha * 0.8);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + drop.length * h * 0.12, y - drop.length * h);
      ctx.stroke();
    }
  }

  function draw(time, dt) {
    const { width: w, height: h } = view;
    view.pointer += (view.pointerTarget - view.pointer) * Math.min(1, dt * 4 || 1);
    ctx.setTransform(view.ratio, 0, 0, view.ratio, 0, 0);
    ctx.drawImage(caches.sky, 0, -DEPTH.sky.rise * view.rise, w, h + DEPTH.sky.rise);
    // The breach breathes.
    const [ix, iy] = [IMPACT[0] * w, IMPACT[1] * h - DEPTH.sky.rise * view.rise];
    const pulse = 0.5 + Math.sin(time * 0.8) * 0.2 + Math.sin(time * 2.9) * 0.05;
    const core = ctx.createRadialGradient(ix, iy, 0, ix, iy, Math.max(w, h) * 0.12);
    core.addColorStop(0, rgba(colors.ink, 0.5 * pulse));
    core.addColorStop(0.3, rgba(colors.lavender, 0.18 * pulse));
    core.addColorStop(1, rgba(colors.neon, 0));
    ctx.fillStyle = core;
    ctx.fillRect(ix - w, iy - h, w * 2, h * 2);
    drawWhale(WHALES[1], time);
    drawShards(time, 0, 0.3);
    drawCity('far');
    drawWhale(WHALES[0], time);
    drawShards(time, 0.3, 0.7);
    drawCity('mid');
    drawCity('near');
    drawFires(time);
    drawShards(time, 0.7, 1.01);
    drawWeather(dt, time);
    // Below the hero the scene steps back so the copy reads; the kit's ground, never black.
    if (view.scrim > 0) {
      ctx.fillStyle = rgba(colors.night, view.scrim);
      ctx.fillRect(0, 0, w, h);
    }
  }

  function loop(now) {
    frame = requestAnimationFrame(loop);
    if (last && now - last < FRAME_MS - 1) return;
    const dt = Math.min(0.08, (now - (last || now)) / 1000);
    last = now;
    clock += dt;
    draw(clock, dt);
  }

  function start() {
    if (frame || document.hidden) return;
    if (motion.matches) { draw(START, 0); return; }
    last = 0;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = undefined;
  }

  if (!ctx) return { start() {}, stop() {}, setScroll() {}, setPointer() {} };
  clock = START;
  build();
  let width = view.width;
  new ResizeObserver(() => {
    const box = canvas.getBoundingClientRect();
    if (Math.abs(box.width - width) < 1 && Math.abs(box.height - view.height) < 120) return;
    width = box.width;
    build();
    if (!frame) draw(clock, 0);
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  motion.addEventListener('change', () => { stop(); start(); });
  return {
    start,
    stop,
    /** rise: 0..1 down the page (the city climbs as you descend); scrim: 0..1 how far the scene steps back. */
    setScroll(rise, scrim) {
      view.rise = Math.max(0, Math.min(1, rise));
      view.scrim = Math.max(0, Math.min(0.75, scrim));
      if (!frame) draw(clock, 0);
    },
    setPointer(x) { view.pointerTarget = motion.matches ? 0 : x; },
  };
}
