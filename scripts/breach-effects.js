import { drawHexShatter } from './hex-shatter.js';
import { breachPalette } from './lib/color.js';
import { noise } from './shatter-geometry.js';

const CODES = ['0xDEAD // FRAME LOST', '10100110 01110100', 'ERR::MEMORY_FRAGMENT', 'CRC MISMATCH █▒░', '/dev/veil: desync', 'REASSEMBLING SIGNAL'];

/**
 * One finite canvas loop for the splash handoff and terminal faults.
 * play(ms, { shatter, surface, image }): `surface` is the element whose text is sampled into displaced blocks
 * (its box bounds a fault; a shatter covers the viewport); `image` is an optional picture whose pixels corrupt too.
 */
export function createBreachEffects({ canvas, motion }) {
  const ctx = canvas.getContext('2d');
  const buffer = document.createElement('canvas');
  const pixels = buffer.getContext('2d');
  let frame;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let palette;
  let target = {};

  function measure() {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    target.box = target.surface?.getBoundingClientRect() ?? { x: 0, y: 0, width, height };
    target.imageBox = target.image?.getBoundingClientRect();
  }

  function snapshot() {
    buffer.width = Math.max(8, Math.ceil(target.box.width / 12));
    buffer.height = Math.max(8, Math.ceil(target.box.height / 12));
    pixels.fillStyle = palette.ground.hex;
    pixels.fillRect(0, 0, buffer.width, buffer.height);
    pixels.fillStyle = palette.ally.hex;
    pixels.font = '2px monospace';
    const lines = (target.surface?.innerText || CODES.join('\n')).split('\n').filter(Boolean);
    lines.forEach((line, i) => pixels.fillText(line, 2, 4 + i * 3, buffer.width - 4));
  }

  function drawCorruption(progress, handoff) {
    const tick = Math.floor(progress * (handoff ? 36 : 12));
    const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.5);
    const bounds = handoff ? { x: 0, y: 0, width, height } : target.box;
    const cell = Math.max(16, Math.round(width / 54));
    const tones = [palette.pink.hex, palette.cyan.hex, palette.ground.hex];
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    // Low-resolution samples of the surface reappear in displaced, square blocks.
    for (let i = 0; i < (handoff ? 36 : 14); i++) {
      const x = bounds.x + Math.floor(noise(i, tick) * bounds.width / cell) * cell;
      const y = bounds.y + Math.floor(noise(i + 71, tick) * bounds.height / cell) * cell;
      const size = cell * (1 + Math.floor(noise(i + 144, tick) * 4));
      const offset = (noise(i + 13, tick) - 0.5) * cell * 5;
      ctx.globalAlpha = envelope * 0.5;
      ctx.fillStyle = tones[i % 3];
      ctx.fillRect(x, y, size, size);
      ctx.globalAlpha = envelope * 0.65;
      const sample = Math.max(1, Math.min(5, buffer.width, buffer.height));
      const sx = Math.floor(noise(i + 26, tick) * (buffer.width - sample));
      const sy = Math.floor(noise(i + 36, tick) * (buffer.height - sample));
      ctx.drawImage(buffer, sx, sy, sample, sample, x + offset, y, size, size);
    }
    // The picture's own pixels corrupt during the reveal.
    const picture = target.image;
    if (handoff && picture?.complete && picture.naturalWidth && target.imageBox && progress > 0.25) {
      for (let i = 0; i < 7; i++) {
        const side = 18 + Math.floor(noise(i, tick + 9) * 4) * 14;
        const sx = noise(i + 3, tick) * (picture.naturalWidth - 120);
        const sy = noise(i + 15, tick) * (picture.naturalHeight - 120);
        const x = target.imageBox.x + sx / picture.naturalWidth * target.imageBox.width;
        const y = target.imageBox.y + sy / picture.naturalHeight * target.imageBox.height;
        ctx.globalAlpha = envelope * 0.6;
        pixels.clearRect(0, 0, 8, 8);
        pixels.drawImage(picture, sx, sy, 120, 120, 0, 0, 8, 8);
        ctx.drawImage(buffer, 0, 0, 8, 8, x + (i % 2 ? side : -side), y, side, side);
      }
    }
    ctx.globalAlpha = envelope * 0.5;
    ctx.font = '11px monospace';
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? palette.ally.hex : palette.pink.hex;
      ctx.fillText(CODES[(i + tick) % CODES.length], bounds.x + noise(i, tick + 7) * Math.max(0, bounds.width - 180), bounds.y + noise(i, tick + 22) * bounds.height);
    }
    // CRT raster and one rolling beam, not repeated full-screen flashes.
    ctx.globalAlpha = envelope * 0.17;
    ctx.fillStyle = '#000';
    for (let y = bounds.y; y < bounds.y + bounds.height; y += 4) ctx.fillRect(bounds.x, y, bounds.width, 1);
    const beamY = bounds.y + progress * bounds.height;
    const beam = ctx.createLinearGradient(0, beamY - 65, 0, beamY);
    beam.addColorStop(0, `rgba(${palette.cyan.rgb}, 0)`);
    beam.addColorStop(1, palette.cyan.hex);
    ctx.globalAlpha = envelope * 0.12;
    ctx.fillStyle = beam;
    ctx.fillRect(bounds.x, beamY - 65, bounds.width, 65);
    ctx.restore();
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = undefined;
    canvas.hidden = true;
    // Release backing stores rather than retaining a viewport bitmap while idle.
    canvas.width = canvas.height = buffer.width = buffer.height = 1;
  }

  function play(duration, { shatter = false, surface, image } = {}) {
    stop();
    if (!ctx || !pixels || motion.matches) return;
    palette = breachPalette();
    target = { surface, image };
    measure();
    snapshot();
    canvas.hidden = false;
    const start = performance.now();
    const draw = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      if (motion.matches || progress >= 1) { stop(); return; }
      if (width !== window.innerWidth || height !== window.innerHeight) { measure(); snapshot(); }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (shatter) drawHexShatter(ctx, progress, width, height, palette);
      drawCorruption(progress, shatter);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
  }

  window.addEventListener('pagehide', stop);
  motion.addEventListener('change', () => { if (motion.matches) stop(); });
  return { play, stop };
}
