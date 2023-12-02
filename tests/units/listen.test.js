import Main from '../../src/core/main';
import loginForm from '../fixtures/login-form';
import * as handleModule from '../../src/core/handle';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('Listen function', () => {
  let passwordField;
  let formElement;
  let spyHandle;
  let keyupEvent;
  let main;
  let state;

  beforeEach(() => {
    document.body.innerHTML = loginForm();
    formElement = document.getElementById('login-form');
    passwordField = document.getElementById('password');

    main = new Main('#login-form', { fields: ['#password'], asterisk: '●' });
    state = main.getState();

    keyupEvent = new KeyboardEvent('keyup', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });
  });

  test('should trigger handle function on keyup', () => {
    spyHandle = vi.spyOn(handleModule, 'handle');

    passwordField.value = 'newpassword';
    passwordField.dispatchEvent(keyupEvent);

    const calledArugs = {
      fieldDom: passwordField,
      event: keyupEvent,
      asterisk: '●',
      action: 'randomize',
      state,
    };

    expect(spyHandle).toHaveBeenCalledWith(calledArugs);
    vi.restoreAllMocks();
  });

  test('should replace characters in password field with asterisks on keyup', () => {
    passwordField.value = 'newpassword';
    passwordField.dispatchEvent(keyupEvent);
    expect(passwordField.value).toBe('●'.repeat(11));
  });

  test('should handle form submission and restore password field', () => {
    const mockSubmitHandler = vi.fn();
    formElement.addEventListener('submit', mockSubmitHandler);

    passwordField.value = 'password';
    passwordField.dispatchEvent(keyupEvent);

    formElement.dispatchEvent(
      new Event('submit', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockSubmitHandler).toHaveBeenCalled();
    expect(passwordField.value).toBe('password');
  });
});
