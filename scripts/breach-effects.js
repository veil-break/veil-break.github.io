import { drawHexShatter } from './hex-shatter.js';
import { noise } from './shatter-geometry.js';

const CODES = ['0xDEAD // FRAME LOST', '10100110 01110100', 'ERR::MEMORY_FRAGMENT', 'CRC MISMATCH █▒░', '/dev/veil: desync', 'REASSEMBLING SIGNAL'];

/** One finite canvas loop shared by the handoff and command errors. */
export function createBreachEffects({ canvas, terminal, operative, motion }) {
  const ctx = canvas.getContext('2d');
  const buffer = document.createElement('canvas');
  const pixels = buffer.getContext('2d');
  let frame;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let terminalBox;
  let operativeBox;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    terminalBox = terminal.getBoundingClientRect();
    operativeBox = operative.getBoundingClientRect();
  }

  function snapshot() {
    buffer.width = Math.ceil(terminalBox.width / 12);
    buffer.height = Math.ceil(terminalBox.height / 12);
    pixels.fillStyle = '#100e17';
    pixels.fillRect(0, 0, buffer.width, buffer.height);
    pixels.fillStyle = '#8ff0cf';
    pixels.font = '2px monospace';
    const lines = terminal.innerText.split('\n').filter(Boolean);
    lines.forEach((line, i) => pixels.fillText(line, 2, 4 + i * 3, buffer.width - 4));
  }

  function drawCorruption(progress, handoff) {
    const tick = Math.floor(progress * (handoff ? 36 : 12));
    const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.5);
    const bounds = handoff ? { x: 0, y: 0, width, height } : terminalBox;
    const cell = Math.max(16, Math.round(width / 54));
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    // Low-resolution terminal samples reappear in displaced, square blocks.
    for (let i = 0; i < (handoff ? 36 : 14); i++) {
      const x = bounds.x + Math.floor(noise(i, tick) * bounds.width / cell) * cell;
      const y = bounds.y + Math.floor(noise(i + 71, tick) * bounds.height / cell) * cell;
      const size = cell * (1 + Math.floor(noise(i + 144, tick) * 4));
      const offset = (noise(i + 13, tick) - 0.5) * cell * 5;
      ctx.globalAlpha = envelope * 0.5;
      ctx.fillStyle = i % 3 === 0 ? '#ff40a0' : i % 3 === 1 ? '#48f5ef' : '#100e17';
      ctx.fillRect(x, y, size, size);
      ctx.globalAlpha = envelope * 0.65;
      const sample = Math.max(1, Math.min(5, buffer.width, buffer.height));
      const sx = Math.floor(noise(i + 26, tick) * (buffer.width - sample));
      const sy = Math.floor(noise(i + 36, tick) * (buffer.height - sample));
      ctx.drawImage(buffer, sx, sy, sample, sample, x + offset, y, size, size);
    }
    // Independently corrupt actual image samples during the operative's reveal.
    if (handoff && operative.complete && operative.naturalWidth && progress > 0.25) {
      for (let i = 0; i < 7; i++) {
        const side = 18 + Math.floor(noise(i, tick + 9) * 4) * 14;
        const sx = noise(i + 3, tick) * (operative.naturalWidth - 120);
        const sy = noise(i + 15, tick) * (operative.naturalHeight - 120);
        const x = operativeBox.x + sx / operative.naturalWidth * operativeBox.width;
        const y = operativeBox.y + sy / operative.naturalHeight * operativeBox.height;
        ctx.globalAlpha = envelope * 0.6;
        pixels.clearRect(0, 0, 8, 8);
        pixels.drawImage(operative, sx, sy, 120, 120, 0, 0, 8, 8);
        ctx.drawImage(buffer, 0, 0, 8, 8, x + (i % 2 ? side : -side), y, side, side);
      }
    }
    ctx.globalAlpha = envelope * 0.5;
    ctx.font = '11px monospace';
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 ? '#8ff0cf' : '#ff40a0';
      ctx.fillText(CODES[(i + tick) % CODES.length], bounds.x + noise(i, tick + 7) * Math.max(0, bounds.width - 180), bounds.y + noise(i, tick + 22) * bounds.height);
    }
    // CRT raster + one rolling beam, not repeated full-screen flashes.
    ctx.globalAlpha = envelope * 0.17;
    ctx.fillStyle = '#000';
    for (let y = bounds.y; y < bounds.y + bounds.height; y += 4) ctx.fillRect(bounds.x, y, bounds.width, 1);
    const beamY = bounds.y + progress * bounds.height;
    const beam = ctx.createLinearGradient(0, beamY - 65, 0, beamY);
    beam.addColorStop(0, '#48f5ef00');
    beam.addColorStop(1, '#48f5ef');
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

  function play(duration, { shatter = false } = {}) {
    stop();
    if (!ctx || !pixels || motion.matches) return;
    resize();
    snapshot();
    canvas.hidden = false;
    const start = performance.now();
    const draw = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      if (motion.matches || progress >= 1) { stop(); return; }
      if (width !== window.innerWidth || height !== window.innerHeight) { resize(); snapshot(); }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (shatter) drawHexShatter(ctx, progress, width, height);
      drawCorruption(progress, shatter);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
  }

  window.addEventListener('pagehide', stop);
  motion.addEventListener('change', () => { if (motion.matches) stop(); });
  return { play, stop };
}
// perf: DPR <= 1.5, ~50 small block samples; no idle animation or new dependency.
