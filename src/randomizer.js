'use strict';

// Those variables are used as module scope containers, for using on both methods.
var origName = {};
var tempName = {};

/**
 * Randomize or recover the name attribute.
 *
 * @param {object} object        The DOM.
 * @param {array}  originalValue The original password.
 */
function randomizer(object, originalValue) {
   

    let _instance = {};

    let obj = object;
    let orig = originalValue;

    /**
     * ramdomize
     *
     * Add random chars on "name" attribute to avid Browser remember what you submitted before.
     */
    _instance.randomize = function() {
        let id = obj.id;
        let randomName = Math.random().toString(36).replace(/[^a-z]+/g, '');

        if (!origName[id]) {
            origName[id] = obj.name;
        }

        if (tempName[origName[id]]) {
            obj.name = tempName[origName[id]];
        } else {
            obj.name = randomName;
            tempName[origName[id]] = randomName;
        }
    };

    /**
     * resote
     *
     * Remove random chars on "name" attribute, so we can submit correct data then.
     * Restore password from star signs to original input password.
     */
    _instance.restore = function() {
        obj.name = origName[obj.id];
        obj.value = orig.join('');
    };

    return _instance;
}

module.exports = randomizer;
