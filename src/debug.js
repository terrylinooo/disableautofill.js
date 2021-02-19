'use strict';

 /**
 * Print colorful messages to the browser console. 
 * For debugging purpose.
 *
 * @param {string} level   The level.
 * @param {string} message The message.
 * @param {mixed}  data    The data.
 * @return null
 */
function debug(level, message, data) {
    let c1, c2, c3, msg;
    let print = false;

    // DAF_DEBUG is defined at DisableAutoFill.js
    if (typeof DAF_DEBUG !== 'undefined') {
        print = DAF_DEBUG;
    }

    switch (level) {
        case 'error':
            c1 = 'color: #e60012';
            c2 = 'color: #c55f67';
            break;
        case 'info':
            c1 = 'color: #00a0e9';
            c2 = 'color: #458ca2';
            break;
        case 'warning':
            c1 = 'color: #eb6100';
            c2 = 'color: #c09374';
            break;
        case 'debug':
            c1 = 'color: #920783';
            c2 = 'color: #8957a1';
            break;
        default:
            return null;
    }
    c3 = 'color: #333333';

    msg = '%c[' + level + '] %cDAF: %c' + message;

    if (print) {
        // Hide line number and source URL.
        setTimeout(console.log.bind(console, msg, c1, c2, c3));

        if (typeof data !== 'undefined' && data !== null) {
            setTimeout(console.log(data));
        }
    }
}

module.exports = debug;
