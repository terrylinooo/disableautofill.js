(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const listener = __webpack_require__(9);
const debug = __webpack_require__(756);

// Global variable for debug.js
__webpack_require__.g.DAF_DEBUG = false;

/**
 * This class is used as an initialization, defining the basic settings
 * and implementing the functionality of disabling autofill.
 */
class DisableAutoFill {

    constructor(setting) {

        // Default settings.
        this.setting = {
            'form': null,
            'fields': [],
            'asterisk': '●',
            'debug': false,
            'callback': null,
        };
        
        Object.keys(this.setting).forEach(key => {
            if (typeof setting[key] !== 'undefined') {
                this.setting[key] = setting[key];
            }
        });
    }

    init() {

        debug('info', 'DisableAutoFill.js is initialized.');

        // Extends native Array.
        // This method will be used in handler.js
        Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item);
        };

        let form = this.setting.form;
        let fields = this.setting.fields;
        let asterisk = this.setting.asterisk;
        let callback = this.setting.callback;

        if (this.setting.debug) {
            DAF_DEBUG = true;
        }

        // Magic happens here.
        listener(form, fields, asterisk, callback);
    }
}

module.exports = DisableAutoFill;

/***/ }),

/***/ 756:
/***/ ((module) => {

"use strict";


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


/***/ }),

/***/ 996:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const randomizer = __webpack_require__(83);
const debug = __webpack_require__(756);

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


/***/ }),

/***/ 327:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(function($) {

    var disableautofill = __webpack_require__(739);

    /**
     * Core function
     */
    $.fn.disableAutoFill = function(options) {
        var settings = $.extend(
            {}, 
            $.fn.disableAutoFill.defaults, 
            options
        );

        settings.form = '#' + this.attr('id');

        var daf = new disableautofill(settings);
        daf.init();
    };

    $.fn.disableAutoFill.defaults = {
        'fields': [],
        'asterisk': '●',
        'debug': false,
        'callback': null,
    };

})(jQuery);


/***/ }),

/***/ 9:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const debug = __webpack_require__(756);
const handler = __webpack_require__(996);

 /**
 * Event listener for password fields.
 * We'd like to hide the original password string with symbol characters.
 *
 * @param {string}   form     The form's .class or #id
 * @param {array}    fields   A collecition of the DOMs' .class or #id
 * @param {string}   asterisk The asterisk symbol. (option)
 * @param {function} callback Generally the form validator.
 * @return null
 */
function listener(form, fields, asterisk, callback) {
    let formDom = null;

    let getDom = text => {

        // text is a string of "class".
        if (text.indexOf('.') == 0) {
            return document.getElementsByClassName(
                text.substring(1)
            )[0];

         // text is a string of "id".
        } else if (text.indexOf('#') == 0) {
            return document.getElementById(
                text.substring(1)
            );
        }
    };

    formDom = getDom(form);

    if (formDom !== null) {
        formDom.addEventListener('keyup', event => {
            fields.forEach((field, i) => {
                let fieldDom = {};
                fieldDom[i] = getDom(field);

                if (typeof fieldDom[i] !== 'undefined') {
                    debug('info', 'Keyup event ' + i + ' is triggered!');
                    handler(fieldDom[i], event, asterisk, 'randomize');
                } else {
                    debug('warning', 'The field called "' + field + '" is not found.');
                }
            });
        });

        formDom.addEventListener('submit', event => {
            event.preventDefault();

            let restorePassword = new Promise((resolve, reject) => {
                fields.forEach((field, i) => {
                    let fieldDom = {};
                    fieldDom[i] = getDom(field);
    
                    if (typeof fieldDom[i] !== 'undefined') {
                        handler(fieldDom[i], event, asterisk, 'restore');
                        return resolve();
                    } else {
                        debug('warning', 'The field called "' + field + '" is not found.');
                        return reject();
                    }
                });
            });

            if (typeof callback === 'function') {
                restorePassword.then(() => {
                    // Once restore the password successfully, run callback function to check the form.
                    if (callback(formDom)) {
                       formDom.submit();
                    } else {
                        debug('warning', 'Callback returned false.');
                    }
                });
            } else {
                restorePassword.then(() => {
                    formDom.submit();
                });
            }
        });

    } else {
        debug('warning', 'Form element "' + form + '" not found.');
    }
    return null;
}

module.exports = listener;


/***/ }),

/***/ 83:
/***/ ((module) => {

"use strict";


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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__(327);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jquery.disableautofill.js.map