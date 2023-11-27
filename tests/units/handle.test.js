import { handle } from '../../src/core/handle';
import State from '../../src/core/state';
import loginForm from '../fixtures/login-form';
import { describe, test, expect, beforeEach } from 'vitest';

describe('handle function', () => {
  let passwordField;
  let asterisk;
  let state;

  beforeEach(() => {
    document.body.innerHTML = loginForm();
    passwordField = document.querySelector('#password');
    asterisk = '●';
    state = new State('1234');
  });

  test('should replace password characters with asterisks on input', () => {
    const inputEvent = new Event('input');
    passwordField.value = 'newpassword';
    handle({
      fieldDom: passwordField,
      event: inputEvent,
      asterisk,
      action: 'randomize',
      state,
    });

    expect(passwordField.value).toBe(asterisk.repeat(passwordField.value.length));
  });

  test('should store original password in state', () => {
    const inputEvent = new Event('input');
    const originalPassword = 'newpassword';
    passwordField.value = originalPassword;
    handle({
      fieldDom: passwordField,
      event: inputEvent,
      asterisk,
      action: 'randomize',
      state,
    });

    const originalPassValue = state.get('original_pass_value');
    expect(originalPassValue[passwordField.id]).toEqual(originalPassword.split(''));
  });

  test('should handle backspace correctly', () => {
    const backspaceEvent = new KeyboardEvent('keydown', { keyCode: 8 });
    passwordField.value = 'newpassword';

    handle({
      fieldDom: passwordField,
      event: backspaceEvent,
      asterisk,
      action: 'randomize',
      state,
    });

    passwordField.value = passwordField.value.slice(0, -1); // Delete the last char.

    handle({
      fieldDom: passwordField,
      event: backspaceEvent,
      asterisk,
      action: 'randomize',
      state,
    });

    expect(passwordField.value).toBe(asterisk.repeat(passwordField.value.length));
  });

  test('should restore password correctly', () => {
    const inputEvent = new Event('input');
    const originalPassword = 'newpassword';
    passwordField.value = originalPassword;

    handle({
      fieldDom: passwordField,
      event: inputEvent,
      asterisk,
      action: 'randomize',
      state,
    });

    handle({
      fieldDom: passwordField,
      event: inputEvent,
      asterisk,
      action: 'restore',
      state,
    });

    expect(passwordField.value).toBe(originalPassword);
  });
});
