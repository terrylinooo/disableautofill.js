'use strict';

const randomizer = require('randomizer');
const debug = require('debug');

// Those variables are used as module scope containers.
var originalValue = [];
var tempValue = [];
var length = [];

/**
 * Handler function handle the DOM is triggered.
 *
 * @param {object} obj      The DOM element.
 * @param {orject} event    The listening event.
 * @param {string} asterisk The asterisk symbol.
 * @param {string} action   The randomizer's action. Option: randomize, restore
 */
function handler(obj, event, asterisk, action) {

    if (!obj.id) {
        // Create a radom string for this DOM's id, if the id doesn't exist.
        obj.id = Math.random().toString(36).substring(5);
    }

    if (!originalValue.hasOwnProperty(obj.id)) {
        // Defind a empty array for this random id string.
        // We'd like to store the original value for restore it later.
        originalValue[obj.id] = [];
    }

    let orig = originalValue[obj.id];

    tempValue[obj.id] = obj.value;
    let temp = tempValue[obj.id];

    length[obj.id] = temp.length;
    let len = length[obj.id];

    // Get current keyup character position.
    let currKeyupPos = obj.selectionStart;

    for (let i = 0; i < len; i++) {
        if (temp[i] !== asterisk) {
            orig[i] = temp[i];
        }
    }

    if (len < orig.length) {
        var diff = orig.length - len;

        var key = event.keyCode || event.charCode;

        // Check if last keypress was backspace or delete
        if (key == 8 || key == 46) {
            orig.splice(currKeyupPos, diff);
        }
        // User highlighted and overwrote a portion of the password
        else {
            orig.splice(currKeyupPos - 1, diff + 1);
            orig.insert(currKeyupPos - 1, temp[currKeyupPos - 1]);
        }
    }

    // Mark password as asterrisk symbols.
    obj.value = temp.replace(/./g, asterisk);

    // Let's randomize the name attribute, preventing Chrome from remembering filled data.
    // We will resotre the real data back when performing form submission.
    let ran = randomizer(obj, orig);

    if (action === 'randomize') {
        ran.randomize();
    } else if (action === 'restore') {
        ran.restore();
    }

    debug('debug', 'Current keyup position: ' + currKeyupPos);
    debug('debug', 'Password length: ' + len);
    debug('debug', 'Password: ', orig);
}

module.exports = handler;
