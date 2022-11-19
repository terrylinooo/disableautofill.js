import Randomizer from './randomizer';
import { getState, updateState } from './states';

/**
 * Handle the DOM as it is triggered.
 *
 * @param {object} obj      The DOM element.
 * @param {object} event    The listening event.
 * @param {string} asterisk The asterisk symbol.
 * @param {string} action   The randomizer's action. Option: randomize, restore
 */
const handle = (obj, event, asterisk, action) => {
  const tempValue = getState('temp_value');
  const length = getState('length');
  const originalValue = getState('original_value');

  const el = obj;
  if (!el.id) {
    // Create a random string for this DOM's id, if the id attribute does not exist.
    el.id = Math.random().toString(36).substring(5);
  }

  if (!Object.prototype.hasOwnProperty.call(originalValue, el.id)) {
    // Define an empty array for this random id string.
    // Store the original value for restoring it later.
    originalValue[el.id] = [];
  }

  const orig = originalValue[el.id];

  tempValue[el.id] = el.value;
  const temp = tempValue[el.id];

  length[el.id] = temp.length;
  const len = length[el.id];

  // Get current keyup character position.
  const currKeyupPos = el.selectionStart;

  for (let i = 0; i < len; i += 1) {
    if (temp[i] !== asterisk) {
      orig[i] = temp[i];
    }
  }

  if (len < orig.length) {
    const diff = orig.length - len;
    const key = event.keyCode || event.charCode;

    // Check if last keypress was backspace or delete.
    if (key === 8 || key === 46) {
      orig.splice(currKeyupPos, diff);
    } else {
      // User highlighted and overwrote a portion of the password
      orig.splice(currKeyupPos - 1, diff + 1);
      orig.splice(currKeyupPos - 1, 0, temp[currKeyupPos - 1]);
    }
  }

  // Mark password as asterrisk symbols.
  el.value = temp.replace(/./g, asterisk);

  // Let's randomize the name attribute, preventing Chrome from remembering filled data.
  // We will restore the real data back when performing form submission.
  const ran = new Randomizer(obj, orig);

  if (action === 'randomize') {
    ran.randomize();
  } else if (action === 'restore') {
    ran.restore();
  }

  updateState('temp_value', tempValue);
  updateState('length', length);
  updateState('original_value', originalValue);
};

export default handle;
