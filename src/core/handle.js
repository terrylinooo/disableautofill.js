import Randomizer from './randomizer';
import { getState, updateState } from './states';

/**
 * Handle the DOM as it is triggered.
 *
 * @param {object} fieldDom The DOM element.
 * @param {object} event    The listening event.
 * @param {string} asterisk The asterisk symbol.
 * @param {string} action   The randomizer's action. Option: randomize, restore
 */
const handle = (fieldDom, event, asterisk, action) => {
  const temporaryPassValue = getState('temporary_pass_value');
  const temporaryPassLength = getState('temporary_pass_length');
  const originalPassValue = getState('original_pass_value');
  const el = fieldDom;

  if (!el.id) {
    el.id = Math.random().toString(36).substring(5);
  }

  if (!Object.prototype.hasOwnProperty.call(originalPassValue, el.id)) {
    // Define an empty array for this random id string.
    // Store the original value for restoring it later.
    originalPassValue[el.id] = [];
  }

  const originalPassChars = originalPassValue[el.id];
  const temporaryPassChars = el.value;
  temporaryPassValue[el.id] = el.value;
  temporaryPassLength[el.id] = temporaryPassChars.length;

  // Get current keyup character position.
  const currKeyupPos = el.selectionStart;

  for (let i = 0; i < temporaryPassChars.length; i += 1) {
    if (temporaryPassChars[i] !== asterisk) {
      originalPassChars[i] = temporaryPassChars[i];
    }
  }

  if (temporaryPassChars.length < originalPassChars.length) {
    const diff = originalPassChars.length - temporaryPassChars.length;
    const key = event.keyCode || event.charCode;

    // Check if last keypress was backspace or delete.
    if (key === 8 || key === 46) {
      originalPassChars.splice(currKeyupPos, diff);
    } else {
      // User highlighted and overwrote a portion of the password
      originalPassChars.splice(currKeyupPos - 1, diff + 1);
      originalPassChars.splice(currKeyupPos - 1, 0, temporaryPassChars[currKeyupPos - 1]);
    }
  }

  // Make password characters as asterisk symbols.
  el.value = temporaryPassChars.replace(/./g, asterisk);

  // Randomize the name attribute, preventing Chrome from remembering filled data.
  // We will restore the original data back when performing form submission.
  const ran = new Randomizer(fieldDom, originalPassChars);

  if (action === 'randomize') {
    ran.randomize();
  } else if (action === 'restore') {
    ran.restore();
  }

  updateState('temporary_pass_value', temporaryPassValue);
  updateState('temporary_pass_length', temporaryPassLength);
  updateState('original_pass_value', originalPassValue);
};

export default handle;
