import Randomizer from './randomizer';
import { HandleOptions } from '../types';

export const handle = ({
  fieldDom,
  event,
  asterisk,
  action,
  state,
}: HandleOptions): void => {
  const temporaryPassValue = state.get('temporary_pass_value');
  const temporaryPassLength = state.get('temporary_pass_length');
  const originalPassValue = state.get('original_pass_value');
  const el = fieldDom;

  // Assign a random ID to the element if it doesn't have one.
  if (!el.id) {
    el.id = Math.random().toString(36).substring(5);
  }

  // Initialize an array to store the original value for later restoration.
  if (!Object.prototype.hasOwnProperty.call(originalPassValue, el.id)) {
    originalPassValue[el.id] = [];
  }

  const originalPassChars = originalPassValue[el.id];
  const temporaryPassChars = el.value;
  temporaryPassValue[el.id] = el.value;
  temporaryPassLength[el.id] = temporaryPassChars.length;

  // Determine the current position of the keyup character.
  const currKeyupPos = el.selectionStart;

  if (currKeyupPos === null) {
    return;
  }

  // Replace non-asterisk characters with their original values.
  for (let i = 0; i < temporaryPassChars.length; i += 1) {
    if (temporaryPassChars[i] !== asterisk) {
      originalPassChars[i] = temporaryPassChars[i];
    }
  }

  // Handle deletion or overwrite of password characters
  if (event instanceof KeyboardEvent && temporaryPassChars.length < originalPassChars.length) {
    const diff = originalPassChars.length - temporaryPassChars.length;

    if (event.code === 'Backspace' || event.code === 'Delete') {
      originalPassChars.splice(currKeyupPos, diff);
    } else {
      // User highlighted and overwrote a portion of the password.
      originalPassChars.splice(currKeyupPos - 1, diff + 1);
      originalPassChars.splice(currKeyupPos - 1, 0, temporaryPassChars[currKeyupPos - 1]);
    }
  }

  // Mask all password characters with asterisks
  el.value = temporaryPassChars.replace(/./g, asterisk);

  // Randomize the name attribute to prevent autofill by browsers like Chrome
  // The original data will be restored when submitting the form.
  const ran = new Randomizer(el, originalPassChars, state);

  if (action === 'randomize') {
    ran.randomize();
  } else if (action === 'restore') {
    ran.restore();
  }

  state.update('temporary_pass_value', temporaryPassValue);
  state.update('temporary_pass_length', temporaryPassLength);
  state.update('original_pass_value', originalPassValue);
};

