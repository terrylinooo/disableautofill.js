/**
 * Jquery - DisableAutoFill plugin
 * The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.
 *
 * @license MIT
 * @version 1.2.4
 * @author  Terry, https://github.com/terrylinooo/
 * @updated 2018-08-01
 * @link    https://github.com/terrylinooo/jquery.disableAutoFill
 */

(function($) {

    'use strict';

    var realPassword = [];
    var realFields = [];

    // An Object for Helper functions.
    var _helper = {};

    // Extend the Array: add "insert" function.
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    /**
     * Helper function - passwordListener
     * - Hide the original password string.
     *
     * @param {object} obj      jQuery DOM object (form)
     * @param {object} settings plugin settings.
     */
    _helper.passwordListener = function(obj, settings) {
        var passObj = (settings.passwordFiled == '') ? '.disabledAutoFillPassword' : settings.passwordFiled;
 
        if (obj.find('[type=password]').length > 0) {
            obj.find('[type=password]').attr('type', 'text').addClass('disabledAutoFillPassword');
        }

        obj.on('keyup', passObj, function() {
            var tmpPassword = $(this).val();
            var passwordLen = tmpPassword.length;

            // Get current keyup character position.
            var currKeyupPos = this.selectionStart;

            for (var i = 0; i < passwordLen; i++) {
                if (tmpPassword[i] != '*') {
                    if (typeof realPassword[i] == 'undefined') {
                        realPassword[i] = tmpPassword[i];
                    } else {
                        if (currKeyupPos != passwordLen) {
                            realPassword.insert(currKeyupPos - 1, tmpPassword[i]);
                        }
                    }
                }
            }

            $(this).val(tmpPassword.replace(/./g, '*'));

            if (settings.debugMode) {
                console.log('Current keyup position: ' + currKeyupPos);
                console.log('Password length: ' + passwordLen);
                console.log('Real password:');
                console.log(realPassword);
            }
        });
    }

    /**
     * Helper function - formSubmitListener
     * - Replace submit button to normal button to make sure everything works fine.
     * 
     * @param {object} obj      jQuery DOM object (form)
     * @param {object} settings plugin settings.
     */
    _helper.formSubmitListener = function(obj, settings) {
        var btnObj = (settings.submitButton == '') ? '.disableAutoFillSubmit' : settings.submitButton;

        obj.on('click', btnObj, function(event) {
            _helper.restoreInput(obj, settings);

            if (settings.callback.call()) {
                if (settings.debugMode) {
                    console.log(obj.serialize())
                } else {
                    // Native HTML form validation requires "type=submit" to work with.
                    if (settings.html5FormValidate) {
                        $(btnObj).attr('type', 'submit').trigger('submit');
                        // Change "type=submit" back to "type=button".
                        setTimeout(function() {
                            $(btnObj).attr('type', 'button');
                        }, 1000);
                        
                    } else {
                        obj.submit();
                    }
                }
            }
        });
    };

    /**
     * Helper function - ramdomizeInput
     * - Add random chars on "name" attribute to avid Browser remember what you submitted before.
     * 
     * @param {object} obj      jQuery DOM object (form)
     * @param {object} settings plugin settings.
     */
    _helper.randomizeInput = function(obj, settings) {
        obj.find('input').each(function(i) {
            realFields[i] = $(this).attr('name');
            $(this).attr('name', Math.random().toString(36).replace(/[^a-z]+/g, ''));
        });
    };

    /**
     * Helper function - restoreInput
     * - Remove random chars on "name" attribute, so we can submit correct data then.
     * - Restore password from star signs to original input password.
     *
     * @param {object} obj      jQuery DOM object (form)
     * @param {object} settings plugin settings.
     */
    _helper.restoreInput = function(obj, settings) {
        if (settings.randomizeInputName) {
            obj.find('input').each(function(i) {
                $(this).attr('name', realFields[i]);
            });
        }
        if (settings.textToPassword) {
            obj.find(settings.passwordFiled).attr('type', 'password');
        }

        obj.find(settings.passwordFiled).val(realPassword.join(''));
    };

    /**
     * Core function
     */
    $.fn.disableAutoFill = function(options) {
        var settings = $.extend(
            {}, 
            $.fn.disableAutoFill.defaults, 
            options
        );

        // Add autocomplete attribute to form, and set it to 'off'
        this.attr('autocomplete', 'off');

        if (this.find('[type=submit]').length > 0) {
            this.find('[type=submit]').addClass('disableAutoFillSubmit').attr('type', 'button');
        }

        if (settings.submitButton != '') {
            this.find(settings.submitButton).addClass('disableAutoFillSubmit').attr('type', 'button');
        }

        if (settings.randomizeInputName) {
            _helper.randomizeInput(this, settings);
        }
        _helper.passwordListener(this, settings);
        _helper.formSubmitListener(this, settings);
        
    };

    $.fn.disableAutoFill.defaults = {
        debugMode: false,
        textToPassword: true,
        randomizeInputName: true,
        passwordFiled: '',
        html5FormValidate: false,
        submitButton: '',
        callback: function() {
            return true;
        },
    };

})(jQuery);
