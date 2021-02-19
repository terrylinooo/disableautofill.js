
const listener = require('listener');
const debug = require('debug');

// Global variable for debug.js
global.DAF_DEBUG = false;

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