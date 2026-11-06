import { mountTerminal } from './terminal.js';

const splash = document.getElementById('splash-root');
const stage = document.getElementById('main');
const windowElement = document.querySelector('.terminal-window');
const soundButton = document.getElementById('toggle-sound');
const sliceAudio = document.getElementById('slice-audio');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const terminal = mountTerminal(glitchTerminal);
let phase = 'splash';
let audioEnabled = false;
let reactRoot;
let splashTimer;
let faultTimer;

function glitchTerminal() {
  windowElement.classList.remove('has-fault');
  clearTimeout(faultTimer);
  // Restart the same finite animation even when commands arrive in quick succession.
  void windowElement.offsetWidth;
  windowElement.classList.add('has-fault');
  faultTimer = setTimeout(() => windowElement.classList.remove('has-fault'), 520);
}

function playSlice() {
  if (audioEnabled) sliceAudio.play().catch(() => {});
}

function renderSplash(playing) {
  reactRoot?.render(window.React.createElement(window.VeilbreakSplash, {
    isPlaying: playing,
    onComplete: beginHandoff,
    onSliceSound: playSlice,
  }));
}

function beginHandoff() {
  if (phase !== 'splash') return;
  phase = 'handoff';
  clearTimeout(splashTimer);
  renderSplash(false);
  splash.inert = true;
  document.body.dataset.phase = phase;
  const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--handoff-duration'));

  setTimeout(() => {
    phase = 'terminal';
    document.body.dataset.phase = phase;
    splash.hidden = true;
    reactRoot?.unmount();
    sliceAudio.pause();
    stage.inert = false;
    terminal.focus();
  }, duration);
}

soundButton.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  soundButton.setAttribute('aria-pressed', String(audioEnabled));
  soundButton.textContent = audioEnabled ? 'audio on' : 'audio off';
  if (!audioEnabled) sliceAudio.pause();
});
document.getElementById('skip-splash').addEventListener('click', beginHandoff);
document.querySelector('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  if (phase === 'terminal') terminal.focus();
  else beginHandoff();
});
window.addEventListener('keydown', (event) => {
  if (phase !== 'splash' || !['Escape', ' ', 'Enter'].includes(event.key)) return;
  if (event.target.closest('button, a, input')) return;
  event.preventDefault();
  beginHandoff();
});

// Keep React confined to its own mount so intro controls and audio survive rendering.
if (!motion.matches && window.React && window.ReactDOM && window.VeilbreakSplash) {
  reactRoot = window.ReactDOM.createRoot(document.getElementById('splash-animation'));
  renderSplash(true);
}
// Begin before the vector splash's own fade-out so both surfaces visibly overlap.
splashTimer = setTimeout(beginHandoff, motion.matches ? 0 : 3600);
