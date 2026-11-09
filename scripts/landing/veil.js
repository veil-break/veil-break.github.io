import { breachPalette } from '../lib/color.js';
import { createEmbers, createRain, particleBudget, riftPoints, wrap } from './veil-field.js';

/**
 * The hero's living backdrop: rain, a flickering rift and rising embers, on one 2D canvas.
 * Runs only while the hero is on screen and the tab is visible; reduced motion draws one still frame.
 */
export function createVeil(canvas, { motion }) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let ratio = 1;
  let rain = [];
  let embers = [];
  let palette;
  let frame;
  let last = 0;
  let visible = true;
  let open = 0.15;

  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width;
    height = box.height;
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const budget = particleBudget(width, height);
    rain = createRain(budget.rain);
    embers = createEmbers(budget.embers);
    palette = breachPalette();
  }

  function drawRift(time) {
    const points = riftPoints(time, open);
    const pulse = 0.75 + Math.sin(time / 700) * 0.25;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const [tone, spread, alpha] of [['pink', 28, 0.05], ['power', 12, 0.1], ['cyan', 4, 0.22], ['ink', 1.2, 0.85]]) {
      ctx.beginPath();
      points.forEach(([x, y, w], i) => {
        const px = x * width + (tone === 'cyan' ? 2 : 0);
        if (i === 0) ctx.moveTo(px - w * width, y * height);
        else ctx.lineTo(px - w * width, y * height);
      });
      for (let i = points.length - 1; i >= 0; i--) {
        const [x, y, w] = points[i];
        ctx.lineTo(x * width + w * width, y * height);
      }
      ctx.closePath();
      ctx.lineJoin = 'miter';
      ctx.lineWidth = spread * (1 + open * 2);
      ctx.strokeStyle = `rgba(${palette[tone].rgb}, ${alpha * pulse})`;
      ctx.fillStyle = `rgba(${palette[tone].rgb}, ${alpha * pulse * 0.6})`;
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRain(dt) {
    ctx.lineWidth = 1;
    for (const drop of rain) {
      drop.y = wrap(drop.y + drop.speed * dt);
      drop.x = wrap(drop.x - drop.speed * dt * 0.12);
      const x = drop.x * width;
      const y = drop.y * height;
      const near = 1 - Math.min(1, Math.abs(drop.x - 0.5) / 0.18);
      const tone = drop.tint === 'ink' && near > 0.5 ? 'cyan' : drop.tint;
      ctx.strokeStyle = `rgba(${palette[tone].rgb}, ${drop.alpha * (1 + near)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + drop.length * height * 0.12, y - drop.length * height);
      ctx.stroke();
    }
  }

  function drawEmbers(dt, time) {
    for (const ember of embers) {
      ember.y = wrap(ember.y - ember.speed * dt);
      const x = (wrap(ember.x + Math.sin(time / 1300 + ember.sway) * 0.01)) * width;
      const y = (0.35 + ember.y * 0.65) * height;
      ctx.fillStyle = `rgba(${palette.ember.rgb}, ${ember.alpha * ember.y})`;
      ctx.fillRect(x, y, ember.size, ember.size);
    }
  }

  function draw(time, dt) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    drawRift(time);
    drawRain(dt);
    drawEmbers(dt, time);
  }

  function loop(time) {
    const dt = Math.min(0.05, (time - (last || time)) / 1000);
    last = time;
    draw(time, dt);
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame || !visible || document.hidden) return;
    if (motion.matches) { draw(0, 0); return; }
    last = 0;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = undefined;
  }

  if (!ctx) return { start() {}, stop() {}, setOpen() {} };
  resize();
  new ResizeObserver(() => { resize(); if (!frame) draw(0, 0); }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  motion.addEventListener('change', () => { stop(); start(); });
  return { start, stop, setOpen(value) { open = Math.max(0, Math.min(1, value)); } };
}
