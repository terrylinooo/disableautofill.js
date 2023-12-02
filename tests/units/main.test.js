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

  test('should initialize with Form element', () => {
    const form = document.querySelector('#login-form');
    const main = new Main(form, {});
    expect(main.form).not.toBeNull();
  });

  test('should handle invalid form selector', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    new Main('.invalid-form', {});
    expect(console.error).toHaveBeenCalledWith('Invalid Form DOM.');

    console.error = originalConsoleError;
  });

  test('should properly destroy the instance', () => {
    const main = new Main('#login-form', {});
    const eventSpy = vi.spyOn(main.event, 'emit');
    const eventDestroySpy = vi.spyOn(main.event, 'destroy');

    main.destroy();

    expect(eventSpy).toHaveBeenCalledWith('restorePasswordName');
    expect(eventDestroySpy).toHaveBeenCalled();
  });

  test('should reset form when calling #resetForm', () => {
    const main = new Main('#login-form', {});
    const originalForm = main.form;
    const parentNode = main.form.parentNode;

    main.destroy();

    expect(parentNode.querySelector('#login-form')).not.toBe(originalForm);
  });
});
