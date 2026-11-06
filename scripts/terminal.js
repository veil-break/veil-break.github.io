import { createTerminalState, recallCommand, SCROLLBACK_LIMIT, submitCommand } from './terminal-state.js';

/** DOM adapter: safe scrollback rendering and native input behavior. */
export function mountTerminal(onError) {
  const state = createTerminalState();
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('command');
  const output = document.getElementById('terminal-output');
  const body = document.getElementById('terminal-body');
  const transcript = document.createElement('div');
  output.append(transcript);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = submitCommand(state, input.value);
    if (!result) return;

    const entry = document.createElement('div');
    const command = document.createElement('p');
    const error = document.createElement('p');
    command.className = 'term-command';
    error.className = 'term-error';
    command.textContent = `guest@veil:~$ ${result.command}`;
    error.textContent = result.error;
    entry.append(command, error);
    transcript.append(entry);
    while (transcript.childElementCount > SCROLLBACK_LIMIT) transcript.firstElementChild.remove();
    input.value = '';
    body.scrollTop = body.scrollHeight;
    input.focus({ preventScroll: true });
    onError();
  });

  input.addEventListener('keydown', (event) => {
    if (event.isComposing || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    input.value = recallCommand(state, event.key === 'ArrowUp' ? -1 : 1, input.value);
    input.setSelectionRange(input.value.length, input.value.length);
  });

  return { focus: () => input.focus({ preventScroll: true }) };
}
