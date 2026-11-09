/**
 * The intro: the branding splash (VeilbreakSplash, React) dissolves through the hex shatter into the live page.
 * Phases on body[data-phase]: splash → handoff → live. Reduced motion skips straight to live.
 */
export function createIntro({ effects, motion, surface, image, onHandoff, onLive }) {
  const splash = document.getElementById('splash-root');
  const main = document.getElementById('main');
  const soundButton = document.getElementById('toggle-sound');
  const sliceAudio = document.getElementById('slice-audio');
  const handoff = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--handoff-duration')) || 2400;
  let phase = 'splash';
  let audioEnabled = false;
  let reactRoot;
  let splashTimer;

  const setPhase = (next) => { phase = next; document.body.dataset.phase = next; };
  const playSlice = () => { if (audioEnabled) sliceAudio.play().catch(() => {}); };

  function renderSplash(playing) {
    reactRoot?.render(window.React.createElement(window.VeilbreakSplash, { isPlaying: playing, onComplete: begin, onSliceSound: playSlice }));
  }

  function begin() {
    if (phase !== 'splash') return;
    clearTimeout(splashTimer);
    renderSplash(false);
    splash.inert = true;
    main.inert = false;
    effects.play(handoff, { shatter: true, surface: surface(), image: image() });
    setPhase('handoff');
    onHandoff?.();
    setTimeout(() => {
      effects.stop();
      setPhase('live');
      splash.hidden = true;
      reactRoot?.unmount();
      sliceAudio.pause();
      onLive?.();
    }, motion.matches ? 0 : handoff);
  }

  main.inert = true;
  soundButton.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    soundButton.setAttribute('aria-pressed', String(audioEnabled));
    soundButton.textContent = audioEnabled ? 'audio on' : 'audio off';
    if (!audioEnabled) sliceAudio.pause();
  });
  document.getElementById('skip-splash').addEventListener('click', begin);
  document.querySelector('.skip-link').addEventListener('click', (event) => {
    event.preventDefault();
    begin();
    main.focus({ preventScroll: true });
  });
  window.addEventListener('keydown', (event) => {
    if (phase !== 'splash' || !['Escape', ' ', 'Enter'].includes(event.key)) return;
    if (event.target.closest('button, a, input')) return;
    event.preventDefault();
    begin();
  });

  // React stays confined to its own mount so the intro controls and audio survive rendering.
  if (!motion.matches && window.React && window.ReactDOM && window.VeilbreakSplash) {
    reactRoot = window.ReactDOM.createRoot(document.getElementById('splash-animation'));
    renderSplash(true);
  }
  // Begin before the vector splash's own fade-out so both surfaces visibly overlap.
  splashTimer = setTimeout(begin, motion.matches ? 0 : 3600);
  return { get phase() { return phase; } };
}
