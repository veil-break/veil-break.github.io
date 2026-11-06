import { describe, expect, test } from 'bun:test';
import { createTerminalState, recallCommand, submitCommand } from '../scripts/terminal-state.js';

describe('simulated terminal', () => {
  test('every command, including familiar shell commands, fails safely as text', () => {
    const state = createTerminalState();
    for (const command of ['help', 'clear', 'reboot', 'sudo rm -rf /', '<script>alert(1)</script>']) {
      const result = submitCommand(state, command);
      expect(result.command).toBe(command);
      expect(result.error).toContain('signal lost. execution denied.');
    }
    expect(state.sequence).toBe(5);
  });

  test('blank submissions do not consume history or error ids', () => {
    const state = createTerminalState();
    expect(submitCommand(state, '   ')).toBeNull();
    expect(state.history).toEqual([]);
    expect(state.sequence).toBe(0);
  });

  test('history navigation clamps and restores the unfinished draft', () => {
    const state = createTerminalState();
    submitCommand(state, 'first');
    submitCommand(state, 'second');
    expect(recallCommand(state, -1, 'unfinished')).toBe('second');
    expect(recallCommand(state, -1, 'second')).toBe('first');
    expect(recallCommand(state, -1, 'first')).toBe('first');
    expect(recallCommand(state, 1, 'first')).toBe('second');
    expect(recallCommand(state, 1, 'second')).toBe('unfinished');
  });

  test('long sessions keep bounded input and history', () => {
    const state = createTerminalState();
    expect(submitCommand(state, 'x'.repeat(1000)).command.length).toBe(256);
    for (let i = 0; i < 75; i++) submitCommand(state, `command-${i}`);
    expect(state.history.length).toBe(50);
    expect(recallCommand(state, -1, '')).toBe('command-74');
  });
});
