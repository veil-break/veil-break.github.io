/** Pure simulated shell state. Commands are text; nothing is executed. */
export const SCROLLBACK_LIMIT = 60;
const HISTORY_LIMIT = 50;

export function createTerminalState() {
  return { history: [], cursor: 0, draft: '', sequence: 0 };
}

export function submitCommand(state, value) {
  const command = value.trim().slice(0, 256);
  if (!command) return null;

  state.history.push(command);
  state.history = state.history.slice(-HISTORY_LIMIT);
  state.cursor = state.history.length;
  state.draft = '';
  state.sequence += 1;

  return {
    command,
    error: `error [0x${state.sequence.toString(16).padStart(4, '0')}]: ${command.split(/\s+/)[0]}: signal lost. execution denied.`,
  };
}

export function recallCommand(state, direction, value) {
  if (state.cursor === state.history.length) state.draft = value;
  state.cursor = Math.max(0, Math.min(state.history.length, state.cursor + direction));
  return state.history[state.cursor] ?? state.draft;
}
