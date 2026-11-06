// @ts-nocheck
/* VeilbreakSplash.jsx — Real-time animated SVG boot splash JSX component
 * Ported from packages/com.veilbreak.branding/Tools~/splash/splash-animation/veilbreak-splash-v2.jsx
 */

(function () {
  const { useState, useEffect, useRef, useMemo } = React;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const Easing = {
    linear: (t) => t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  };

  const VB = {
    ground: '#0d0811',
    ink: '#faeef4',
    teal: '#1dd9a0',
    lav: '#c084fc',
    pink: 'rgb(255,64,160)',
    ghostTeal: 'rgb(29,217,160)',
  };

  const MOTION = {
    fade: Easing.easeOutCubic,
    burst: Easing.easeOutExpo,
    drift: Easing.easeInOutSine,
  };

  const PARTS = [
    { id: 'V', d: 'M109.364 322.697 L89.348 272.297 L95.9 272.297 L106.196 298.721 C110.3 309.233 112.82 315.929 112.892 316.145 L113.036 316.145 C113.108 315.929 115.556 309.305 119.588 299.081 L130.028 272.297 L136.364 272.297 L116.348 322.697 Z' },
    { id: 'E1', d: 'M164.66 322.697 L164.66 272.297 L198.572 272.297 L198.572 277.769 L170.492 277.769 L170.492 293.609 L192.38 293.609 L192.38 299.081 L170.492 299.081 L170.492 317.225 L198.716 317.225 L198.716 322.697 Z' },
    { id: 'I', d: 'M229.46 322.697 L229.46 272.297 L235.292 272.297 L235.292 322.697 Z' },
    { id: 'Lstem', d: 'M267.98 322.697 L267.98 272.297 L273.812 272.297 L273.812 317.225 L276.246 317.225 L273.236 322.697 Z' },
    { id: 'Lfoot', d: 'M273.236 322.697 L276.246 317.225 L283.063 317.225 L300.38 317.225 L300.38 322.697 L279.905 322.697 Z' },
    { id: 'Bstem', d: 'M240.188 382.785 L240.188 346.297 L258.332 346.297 C258.976 346.297 259.604 346.323 260.214 346.374 L260.214 346.374 L257.483 351.34 C257.383 351.338 257.282 351.337 257.18 351.337 L246.02 351.337 L246.02 367.897 L248.376 367.897 Z' },
    { id: 'Bbowl', d: 'M262.774 352.381 L265.536 347.594 C270.479 349.588 273.38 353.705 273.38 358.681 C273.38 365.305 269.132 368.689 265.46 369.553 L265.46 369.769 C270.212 370.561 276.908 374.089 276.908 382.657 C276.908 391.153 270.788 396.697 259.7 396.697 L240.188 396.697 L240.188 390.28 L246.02 380.81 L246.02 391.657 L259.412 391.657 C266.18 391.657 270.788 388.561 270.788 382.369 C270.788 376.033 265.46 372.505 259.268 372.505 L251.134 372.505 L251.522 371.876 L253.818 367.897 L257.756 367.897 C263.372 367.897 267.476 365.017 267.476 359.545 C267.476 356.249 265.796 353.714 262.774 352.381 Z' },
    { id: 'R', d: 'M306.644 396.697 L306.644 346.297 L322.052 346.297 C333.86 346.297 340.844 352.129 340.844 361.993 C340.844 369.769 336.452 374.305 329.324 375.817 L341.78 396.697 L334.724 396.697 L323.276 376.897 C322.196 376.969 319.748 376.969 318.668 376.969 L312.476 376.969 L312.476 396.697 Z M312.476 351.697 L312.476 372.073 L322.628 372.073 C329.972 372.073 334.868 369.481 334.868 362.209 C334.868 355.081 330.116 351.697 322.268 351.697 Z' },
    { id: 'E2', d: 'M371.588 396.697 L371.588 346.297 L405.5 346.297 L405.5 351.769 L377.42 351.769 L377.42 367.609 L399.308 367.609 L399.308 373.081 L377.42 373.081 L377.42 391.225 L405.644 391.225 L405.644 396.697 Z' },
    { id: 'A', d: 'M432.5 396.697 L453.956 346.297 L460.364 346.297 L481.82 396.697 L475.556 396.697 L469.94 383.305 L444.38 383.305 L438.764 396.697 Z M457.052 352.993 C456.98 353.065 454.028 360.193 452.156 364.729 L446.612 377.977 L467.708 377.977 L462.164 364.801 C460.22 360.193 457.268 353.065 457.196 352.993 Z' },
    { id: 'K', d: 'M510.692 396.697 L510.692 346.297 L516.524 346.297 L516.524 361.993 L516.524 372.865 L516.668 372.865 L524.876 364.153 L541.652 346.297 L548.708 346.297 L529.772 366.457 L550.652 396.769 L543.74 396.697 L525.452 370.633 L516.524 379.921 L516.524 396.697 Z' },
    { id: 's1', blade: true, d: 'M418.646 88.291 L451.652 45 L401.071 132.64 L394.254 132.64 Z' },
    { id: 's2', blade: true, d: 'M378.222 161.789 L391.244 138.112 L397.913 138.112 L383.544 163.008 C381.969 162.373 380.185 161.952 378.222 161.789 Z' },
    { id: 's3', blade: true, d: 'M319.646 268.291 L358.196 198.2 L358.196 205.695 Z' },
    { id: 's4', blade: true, d: 'M375.491 166.754 L378.222 161.789 C380.185 161.952 381.969 162.373 383.544 163.008 L380.782 167.795 L371.826 183.312 L369.53 187.291 L369.142 187.92 L364.028 196.225 L358.196 205.695 L358.196 198.2 L366.384 183.312 Z' },
  ];

  const K25 = { text: [0, -8.23], blade: [-77.997, 108] };
  const K50 = { text: [1.652, -4.585], blade: [-116.356, 180] };
  const KA4 = {
    V: [-0.207, -2.297], E1: [-0.207, -2.297], I: [-0.207, -2.297], Lstem: [-0.207, -2.297],
    Lfoot: [-1.934, 0.063], Bstem: [-8.793, 18.503],
    Bbowl: [0.207, 13.519], R: [0.207, 13.519], E2: [0.207, 13.519], A: [0.207, 13.519], K: [0.207, 13.519],
    s1: [-144.207, 234.288], s2: [-137.518, 222.176], s3: [-147.201, 222.997], s4: [-147.201, 222.997],
  };
  const PRE = 300, UP = [0.5855, -0.8107];
  const KNOTS = [0, PRE, PRE + 133.2, PRE + 214.78, PRE + 268.3];
  const D = KNOTS[4], D50 = KNOTS[3];

  const TIP_B = [203.29, 448.291], TIP_T = [335.296, 225];
  const U = [0.5089, -0.8608], N = [0.8608, 0.5089];

  function monotone(xs, ys) {
    const n = xs.length, dx = [], s = [], m = new Array(n);
    for (let i = 0; i < n - 1; i++) { dx[i] = xs[i + 1] - xs[i]; s[i] = (ys[i + 1] - ys[i]) / dx[i]; }
    m[0] = s[0]; m[n - 1] = s[n - 2];
    for (let i = 1; i < n - 1; i++) m[i] = s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (s[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
      const a = m[i] / s[i], b = m[i + 1] / s[i], h = a * a + b * b;
      if (h > 9) { const t = 3 / Math.sqrt(h); m[i] = t * a * s[i]; m[i + 1] = t * b * s[i]; }
    }
    return (x) => {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      let i = 0; while (x > xs[i + 1]) i++;
      const h = dx[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
    };
  }

  const TRACKS = PARTS.map((p) => {
    const pre = p.blade ? [PRE * UP[0], PRE * UP[1]] : [0, 0];
    const keys = [pre, [0, 0], p.blade ? K25.blade : K25.text, p.blade ? K50.blade : K50.text, KA4[p.id]];
    return [monotone(KNOTS, keys.map((k) => k[0])), monotone(KNOTS, keys.map((k) => k[1]))];
  });
  const posAt = (d) => TRACKS.map(([fx, fy]) => [fx(d), fy(d)]);

  const rnd = (a, b = 0, c = 0) => { const x = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return x - Math.floor(x); };
  const spread = (a, b, c) => rnd(a, b, c) * 2 - 1;

  const SPARKS = Array.from({ length: 44 }, (_, i) => {
    const side = i % 2 ? 1 : -1, ang = spread(i, 3) * 0.75;
    const c = Math.cos(ang), s = Math.sin(ang);
    const bx = N[0] * side, by = N[1] * side;
    const along = spread(i, 4) * 0.5;
    let dx = bx * c - by * s + U[0] * along, dy = bx * s + by * c + U[1] * along;
    const l = Math.hypot(dx, dy); dx /= l; dy /= l;
    return { t: 0.15 + rnd(i, 1) * 0.75, dir: [dx, dy], dist: 90 + rnd(i, 5) * 420, len: 14 + rnd(i, 6) * 46,
             delay: rnd(i, 7) * 0.05, life: 0.45 + rnd(i, 8) * 0.55, col: i % 4 };
  });

  const GRAIN = (() => {
    try {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d'), img = x.createImageData(256, 256);
      for (let i = 0; i < img.data.length; i += 4) { const v = (Math.random() * 255) | 0; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      x.putImageData(img, 0, 0); return c.toDataURL('image/png');
    } catch (e) { return null; }
  })();

  const pts = (arr) => arr.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const hexPts = (cx, cy, r) => [300, 0, 60, 120, 180, 240, 300].map((a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]);

  function LogoLayer({ d, ink, blade, textOpacity = 1, bladeOnly = false }) {
    const pos = posAt(d);
    return (
      <g>
        {PARTS.map((p, i) => (bladeOnly && !p.blade) ? null : (
          <path key={p.id} d={p.d} fillRule="evenodd" fill={p.blade ? blade : ink}
                opacity={p.blade ? 1 : textOpacity}
                transform={`translate(${pos[i][0].toFixed(3)} ${pos[i][1].toFixed(3)})`} />
        ))}
      </g>
    );
  }

  // Authored scene CUE offsets
  const CUES = {
    Veil: 0,
    Strike: 1.0,
    Break: 1.18,
    Hold: 2.48,
    Exit: 3.78,
  };
  const AUTHORED_TOTAL = 4.33;

  function VeilbreakSplash({ onComplete, onSliceSound, isPlaying = true, reducedMotion = false }) {
    const [T, setT] = useState(0);
    const startRef = useRef(null);
    const sliceFiredRef = useRef(false);
    const completedRef = useRef(false);

    useEffect(() => {
      if (reducedMotion) {
        setT(AUTHORED_TOTAL);
        if (onComplete && !completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
        return;
      }

      if (!isPlaying) return;

      let rafId;
      startRef.current = performance.now();
      sliceFiredRef.current = false;
      completedRef.current = false;

      const loop = (now) => {
        const elapsed = (now - startRef.current) / 1000;
        setT(elapsed);

        // Sound trigger point: Break (1.18) - SliceLead (0.24) = 0.94s
        if (elapsed >= 0.94 && !sliceFiredRef.current) {
          sliceFiredRef.current = true;
          if (onSliceSound) onSliceSound();
        }

        if (elapsed >= AUTHORED_TOTAL) {
          if (onComplete && !completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
          return;
        }

        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafId);
    }, [isPlaying, reducedMotion, onComplete, onSliceSound]);

    const strikeLen = CUES.Break - CUES.Strike;
    const breakLen = CUES.Hold - CUES.Break;
    const exitLen = AUTHORED_TOTAL - CUES.Exit;
    const HITSTOP = Math.min(0.06, breakLen * 0.2);

    const dAt = (t) => {
      if (t <= CUES.Strike) return 0;
      if (t < CUES.Break) return D50 * (t - CUES.Strike) / strikeLen;
      return D50 + (D - D50) * MOTION.burst(clamp((t - CUES.Break - HITSTOP) / (breakLen - HITSTOP), 0, 1));
    };

    const d = dAt(T);
    const solid = VB.ink;
    const bladeFill = solid;

    // Impact timing
    const age = T - CUES.Break, hit = age >= 0;
    const inv = hit && age < 0.045;
    const flash = hit && !inv ? 0.75 * Math.exp(-(age - 0.045) / 0.09) : 0;
    const shake = hit ? 18 * Math.exp(-age / 0.14) : 0;
    const shx = shake * Math.sin(age * 97), shy = shake * 0.7 * Math.sin(age * 73 + 1);
    const punch = hit ? Math.exp(-age / 0.18) : 0;
    const burst = hit ? Math.exp(-age / 0.16) : 0;
    const sh = hit ? 46 * Math.exp(-age / 0.2) : 0;
    const beam = hit ? 14 * Math.exp(-age / 0.12) : 0;
    const amb = hit ? 0.22 * Math.exp(-age / 0.2) : 0;
    const lean = clamp((T - (CUES.Strike - 0.35)) / 0.35, 0, 1) * (hit ? 0 : 1);

    const pal = inv ? { bg: VB.ink, ink: VB.ground, blade: VB.ground, hex: VB.ground }
                    : { bg: VB.ground, ink: VB.ink, blade: bladeFill, hex: VB.ink };

    const letters = MOTION.fade(clamp((T - CUES.Veil - 0.1) / 0.7, 0, 1));
    const S = (1.8 + 0.15 * MOTION.drift(clamp(T / AUTHORED_TOTAL, 0, 1))) * (1 + 0.07 * punch + 0.02 * lean);
    const ox = 960 + shx, oy = 540 + shy;
    const cam = `translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${S.toFixed(4)}) translate(-320 -343)`;
    const toScreen = (p) => [ox + (p[0] - 320) * S, oy + (p[1] - 343) * S];
    const tb = toScreen(TIP_B), tt = toScreen(TIP_T);
    const hp = [(tb[0] + tt[0]) / 2, (tb[1] + tt[1]) / 2];

    const pHex = MOTION.drift(clamp((T - CUES.Veil - 0.1) / (CUES.Exit - CUES.Veil - 0.1), 0, 1));
    const hexR = 500 * (1 + 0.04 * MOTION.drift(clamp(T / AUTHORED_TOTAL, 0, 1))) * (1 + 0.035 * punch);
    const hv = hexPts(960 + shx * 0.5, 540 + shy * 0.5, hexR);
    const seg = Math.min(5, Math.floor(pHex * 6)), sf = pHex * 6 - seg;
    const tip = [hv[seg][0] + (hv[seg + 1][0] - hv[seg][0]) * sf, hv[seg][1] + (hv[seg + 1][1] - hv[seg][1]) * sf];
    const hexOp = 0.5 + 0.5 * Math.max(burst, flash);

    // Exit glitch computation
    const g = T - CUES.Exit;
    let overlay = 1, mainOn = 1, slices = null, ghost = null;
    if (g >= 0) {
      const p = clamp(g / exitLen, 0, 1);
      overlay = p < 0.65 ? 1 : 1 - (p - 0.65) / 0.35;
      const j = Math.floor(g / 0.055);
      const inten = 0.35 + 0.65 * clamp((j * 0.055) / exitLen, 0, 1);
      if (rnd(j, 1) >= 0.18) {
        mainOn = 0;
        slices = Array.from({ length: 8 }, (_, i) => ({
          tx: spread(j, i, 2) * (rnd(j, i, 3) < 0.45 ? 100 : 14) * inten,
          op: rnd(j, i, 4) < 0.22 * inten ? 0 : 1,
        }));
        const split = (4 + 16 * inten) * 1.8;
        ghost = { op: 0.85, pink: [-split + spread(j, 7) * 11, spread(j, 8) * 5.4], teal: [split + spread(j, 9) * 11, spread(j, 10) * 5.4] };
      }
    } else if (hit && burst > 0.02 && !inv) {
      const split = 3 + 34 * burst;
      ghost = { op: 0.85 * burst, pink: [-split, -split * 0.2], teal: [split, split * 0.2] };
    }

    const bandTop = 540 + (258 - 343) * S, bandH = ((502 - 258) * S) / 8;
    const trail = [1, 2, 3, 4, 5, 6].map((k) => ({ k, d: dAt(T - 0.012 * k) })).filter((e) => d - e.d > 2);
    const glowOp = T > CUES.Strike ? 0.45 + 0.55 * burst : 0;

    const L = 3200;
    const half = (side) => pts([
      [hp[0] - U[0] * L, hp[1] - U[1] * L], [hp[0] + U[0] * L, hp[1] + U[1] * L],
      [hp[0] + U[0] * L + N[0] * L * side, hp[1] + U[1] * L + N[1] * L * side],
      [hp[0] - U[0] * L + N[0] * L * side, hp[1] - U[1] * L + N[1] * L * side],
    ]);
    const beamA = [hp[0] - U[0] * L, hp[1] - U[1] * L], beamB = [hp[0] + U[0] * L, hp[1] + U[1] * L];

    const world = (
      <g>
        <polyline points={pts(hv)} fill="none" stroke={pal.hex} strokeWidth="1.5" opacity={0.08 * letters} />
        <g opacity={hexOp}>
          <polyline points={pts(hv)} fill="none" stroke={pal.hex} strokeWidth="7" pathLength="1"
                    strokeDasharray={`${pHex.toFixed(4)} 2`} strokeLinejoin="miter" opacity="0.35" filter="url(#vbs-blur)" />
          <polyline points={pts(hv)} fill="none" stroke={pal.hex} strokeWidth="2" pathLength="1"
                    strokeDasharray={`${pHex.toFixed(4)} 2`} strokeLinejoin="miter" opacity="0.7" />
          {pHex > 0.001 && pHex < 0.999 && (
            <g>
              <circle cx={tip[0]} cy={tip[1]} r="16" fill={pal.hex} opacity="0.35" filter="url(#vbs-blur)" />
              <circle cx={tip[0]} cy={tip[1]} r="3.5" fill={pal.hex} />
            </g>
          )}
        </g>
        {ghost && [['pink', VB.pink], ['teal', VB.ghostTeal]].map(([key, color]) => (
          <g key={key} opacity={ghost.op} transform={`translate(${ghost[key][0].toFixed(2)} ${ghost[key][1].toFixed(2)})`}>
            <g transform={cam}><LogoLayer d={d} ink={color} blade={color} textOpacity={letters} /></g>
          </g>
        ))}
        <g opacity={glowOp * mainOn} transform={cam} filter="url(#vbs-blur)">
          <LogoLayer d={d} ink={pal.ink} blade={solid} bladeOnly />
        </g>
        {trail.map((e) => (
          <g key={e.k} opacity={0.5 / e.k} transform={cam}>
            <LogoLayer d={e.d} ink={pal.ink} blade={pal.blade} bladeOnly />
          </g>
        ))}
        <g opacity={mainOn} transform={cam}>
          <LogoLayer d={d} ink={pal.ink} blade={pal.blade} textOpacity={letters} />
        </g>
        {slices && slices.map((s, i) => (
          <g key={i} clipPath={`url(#vbs-band-${i})`} opacity={s.op}>
            <g transform={`translate(${s.tx.toFixed(2)} 0)`}>
              <g transform={cam}><LogoLayer d={d} ink={VB.ink} blade={bladeFill} /></g>
            </g>
          </g>
        ))}
      </g>
    );

    const grainFrame = Math.floor(T * 24);

    return (
      <div className="vbs-canvas-wrap">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" className="vbs-svg">
          <defs>
            <radialGradient id="vbs-amb" gradientUnits="userSpaceOnUse" cx={hp[0]} cy={hp[1]} r="620">
              <stop offset="0" stopColor={solid} stopOpacity="1" />
              <stop offset="1" stopColor={solid} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vbs-vig" gradientUnits="userSpaceOnUse" cx="960" cy="540" r="1150">
              <stop offset="0.4" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.85" />
            </radialGradient>
            <filter id="vbs-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="vbs-blur-wide" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            {GRAIN && (
              <pattern id="vbs-grain" patternUnits="userSpaceOnUse" width="256" height="256"
                       patternTransform={`translate(${(rnd(grainFrame, 1) * 256).toFixed(0)} ${(rnd(grainFrame, 2) * 256).toFixed(0)})`}>
                <image href={GRAIN} width="256" height="256" />
              </pattern>
            )}
            {Array.from({ length: 8 }, (_, i) => (
              <clipPath key={i} id={`vbs-band-${i}`}>
                <rect x="0" y={bandTop + i * bandH} width="1920" height={bandH + 0.5} />
              </clipPath>
            ))}
            <clipPath id="vbs-half-0"><polygon points={half(1)} /></clipPath>
            <clipPath id="vbs-half-1"><polygon points={half(-1)} /></clipPath>
          </defs>

          <rect width="1920" height="1080" fill={pal.bg} />
          {amb > 0.01 && !inv && <rect width="1920" height="1080" fill="url(#vbs-amb)" opacity={amb} />}

          <g opacity={overlay}>
            {sh > 0.5 ? [1, -1].map((side, i) => (
              <g key={i} clipPath={`url(#vbs-half-${i})`}>
                <g transform={`translate(${(U[0] * sh * side + N[0] * sh * 0.22 * side).toFixed(2)} ${(U[1] * sh * side + N[1] * sh * 0.22 * side).toFixed(2)})`}>
                  {world}
                </g>
              </g>
            )) : world}
          </g>

          {beam > 0.2 && (
            <g>
              <line x1={beamA[0]} y1={beamA[1]} x2={beamB[0]} y2={beamB[1]} stroke={solid} strokeWidth={beam * 3.5} opacity="0.55" filter="url(#vbs-blur-wide)" />
              <line x1={beamA[0] - N[0] * beam * 0.7} y1={beamA[1] - N[1] * beam * 0.7} x2={beamB[0] - N[0] * beam * 0.7} y2={beamB[1] - N[1] * beam * 0.7} stroke={VB.pink} strokeWidth={beam * 0.6} opacity="0.8" />
              <line x1={beamA[0] + N[0] * beam * 0.7} y1={beamA[1] + N[1] * beam * 0.7} x2={beamB[0] + N[0] * beam * 0.7} y2={beamB[1] + N[1] * beam * 0.7} stroke={VB.ghostTeal} strokeWidth={beam * 0.6} opacity="0.8" />
              <line x1={beamA[0]} y1={beamA[1]} x2={beamB[0]} y2={beamB[1]} stroke={inv ? VB.ground : VB.ink} strokeWidth={beam} />
            </g>
          )}

          {hit && [0, 1].map((k) => {
            const a = age - k * 0.07;
            if (a <= 0 || a >= 0.8) return null;
            const q = a / 0.8, r = 140 + 1500 * MOTION.burst(q);
            return <polyline key={k} points={pts(hexPts(960 + shx * 0.5, 540 + shy * 0.5, r))} fill="none"
                             stroke={k ? solid : (inv ? VB.ground : VB.ink)} strokeWidth={0.8 + 7 * (1 - q)} opacity={(1 - q) * 0.85} strokeLinejoin="miter" />;
          })}

          {hit && SPARKS.map((s, i) => {
            const a = age - s.delay;
            if (a <= 0 || a >= s.life) return null;
            const q = a / s.life, e = MOTION.burst(q);
            const o = [tb[0] + (tt[0] - tb[0]) * s.t, tb[1] + (tt[1] - tb[1]) * s.t];
            const hx = o[0] + s.dir[0] * s.dist * e, hy = o[1] + s.dir[1] * s.dist * e;
            const tl = s.len * (1 - q) * (1 + 2 * (1 - e));
            const col = [VB.ink, solid, VB.pink, VB.ghostTeal][s.col];
            return <line key={i} x1={hx} y1={hy} x2={hx - s.dir[0] * tl} y2={hy - s.dir[1] * tl}
                         stroke={inv ? VB.ground : col} strokeWidth={2.4 * (1 - q) + 0.6} strokeLinecap="round" opacity={1 - q} />;
          })}

          {flash > 0.01 && <rect width="1920" height="1080" fill={VB.ink} opacity={flash} />}
          {!inv && <rect width="1920" height="1080" fill="url(#vbs-vig)" opacity={0.8 + 0.2 * lean} />}
          {GRAIN && <rect width="1920" height="1080" fill="url(#vbs-grain)" opacity="0.055" />}
        </svg>
      </div>
    );
  }

  window.VeilbreakSplash = VeilbreakSplash;
})();
