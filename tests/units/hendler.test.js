describe('Unit testing for handler...', () => {
  test('Check the function - queue, wait for 2 seconds.', () => {
    const tempValue = [];
    const length = [];
    const originalValue = {};
    const el = {};
    el.id = 'adfads';
    el.value = '12345678';

    if (!Object.prototype.hasOwnProperty.call(originalValue, el.id)) {
      // Defind a empty array for this random id string.
      // We'd like to store the original value for restore it later.
      originalValue[el.id] = ['7', '7', '7', '7', '7', '7', '7', '7'];
    }

    const orig = originalValue[el.id];

    tempValue[el.id] = el.value;
    const temp = tempValue[el.id];

    length[el.id] = temp.length;
    const len = length[el.id];

    // Get current keyup character position.
    const currKeyupPos = 3;

    for (let i = 0; i < len; i += 1) {
      if (temp[i] !== '●') {
        orig[i] = temp[i];
      }
    }

    // Extends native Array.
    // This method will be used in handler.js
    Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item);
    };

    if (len < orig.length) {
      const diff = orig.length - len;

      const key = 333;

      // Check if last keypress was backspace or delete
      if (key === 8 || key === 46) {
        orig.splice(currKeyupPos, diff);
      } else {
        // User highlighted and overwrote a portion of the password
        orig.splice(currKeyupPos - 1, diff + 1);
        orig.insert(currKeyupPos - 1, temp[currKeyupPos - 1]);
      }
    }

    console.log(orig);
  });
});
