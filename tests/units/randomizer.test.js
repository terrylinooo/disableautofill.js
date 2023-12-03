import Randomizer from '../../src/core/randomizer';
import State from '../../src/core/state';
import loginForm from '../fixtures/login-form';
import { describe, test, expect, beforeEach } from 'vitest';

describe('Randomizer class', () => {
  let passwordField;
  let randomizer;
  let state;

  beforeEach(() => {
    document.body.innerHTML = loginForm();
    passwordField = document.querySelector('#password');
    state = new State('1234');
    randomizer = new Randomizer(passwordField, passwordField.value.split(''), state);
  });

  test('should randomize the name attribute of the password field', () => {
    const originalName = passwordField.name;

    randomizer.randomize();

    expect(passwordField.name).not.toBe(originalName);
    expect(passwordField.name).not.toBe('');
  });

  test('should restore the original name attribute of the password field', () => {
    randomizer.randomize();
    const randomizedName = passwordField.name;
    randomizer.restore();

    expect(passwordField.name).toBe('password');
    expect(passwordField.name).not.toBe(randomizedName);
  });
});
