/* eslint-disable no-new */
/* eslint-disable no-console */
import Main from '../../src/core/main';
import loginForm from '../fixtures/login-form';
import { describe, test, expect, beforeEach, vi } from 'vitest';

describe('Main class', () => {
  beforeEach(() => {
    document.body.innerHTML = loginForm();
  });

  test('should initialize with default settings', () => {
    const main = new Main('#login-form', {});
    expect(main.form).not.toBeNull();
  });

  test('should handle invalid form selector', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    new Main('.invalid-form', {});
    expect(console.error).toHaveBeenCalledWith('Invalid Form DOM.');

    console.error = originalConsoleError;
  });
});
