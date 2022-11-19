import Randomizer from '../../src/core/randomizer';
import { initializeState } from '../../src/core/states';
import loginForm from '../fixtures/login-form';

describe('Unit testing for handler...', () => {
  beforeEach(() => {
    initializeState();
    document.body.innerHTML = loginForm();
  });

  test('Check the function - queue, wait for 2 seconds.', () => {
    const passwordField = document.querySelector('#password');
    const originalName = passwordField.name;
    const originalValue = passwordField.value;

    expect(originalName).toBe('password');
    expect(originalValue).toBe('12345678');

    const randomizer = new Randomizer(passwordField, originalValue.split(''));

    randomizer.randomize();

    expect(passwordField.name === 'password').toBeFalsy();

    randomizer.restore();

    expect(passwordField.name === 'password').toBeTruthy();
  });
});
