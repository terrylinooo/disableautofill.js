/**
 * Jquery - DisableAutoFill plugin
 * The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.
 *
 * @license MIT
 * @version 1.2.3
 * @author  Terry, https://github.com/terrylinooo/
 * @updated 2018-08-01
 * @link    https://github.com/terrylinooo/jquery.disableAutoFill
 */

(function($) {

    var realPassword = [];
    var realFields = [];
    var _helper = {};

    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    _helper.passwordListener = function(obj, settings) {
        var passObj = (settings.passwordFiled == '') ? '.disabledAutoFillPassword' : settings.passwordFiled;
 
        if (obj.find('[type=password]').length > 0) {
            obj.find('[type=password]').attr('type', 'text').addClass('disabledAutoFillPassword');
        }

        $(obj).on('keyup', passObj, function() {
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
     * Helper function
     * - Replace submit button to normal button to make sure everything works fine.
     */
    _helper.formSubmitListener = function(obj, settings) {
        var btnObj = (settings.submitButton == '') ? '.disableAutoFillSubmit' : settings.submitButton;

        $(obj).on('click', btnObj, function(event) {
            _helper.restoreInput(obj, settings);
 
            if (settings.callback.call()) {
                if (settings.debugMode) {
                    console.log(obj.serialize())
                } else {
                    obj.submit();
                }
            }
            if (settings.randomizeInputName) {
                _helper.randomizeInput(obj, settings);
            }
            _helper.passwordListener(obj, settings);
        });
    };

    /**
     * Helper function
     * - Add random chars on "name" attribute to avid Browser remember what you submitted before.
     */
    _helper.randomizeInput = function(obj, settings) {
        obj.find('input').each(function(i) {
            realFields[i] = $(this).attr('name');
            $(this).attr('name', Math.random().toString(36).replace(/[^a-z]+/g, ''));
        });
    };

    /**
     * Helper function
     * - Remove random chars on "name" attribute, so we can submit correct data then.
     * - Restore password from star signs to original input password.
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

        if (this.find('[type=submit]').length > 0) {
            this.find('[type=submit]').attr('type', 'button').addClass('disableAutoFillSubmit');
        }

        // Add autocomplete attribute to form, and set it to 'off'
        this.attr('autocomplete', 'off');

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
        submitButton: '',
        callback: function() {
            return true;
        },
    };

})(jQuery);
