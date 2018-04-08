/**
 * Jquery - DisableAutoFill plugin
 * Te easiest solution for disabling Google Chrome auto-fill, auto-complete functions.
 *
 * @license MIT
 * @version 1.2
 * @author  Terry, https://github.com/terrylinooo/
 * @updated 2018-03-29
 * @link    https://github.com/terrylinooo/jquery.disableAutoFill
 */

(function($) {

    var realPassword = [];
    var realFields = [];
    var _helper = {};

    _helper.passwordListener = function(obj, settings) {
        var passObj = (settings.passwordFiled == '') ? '.disabledAutoFillPassword' : settings.passwordFiled;
 
        if (obj.find('[type=password]').length > 0) {
            obj.find('[type=password]').attr('type', 'text').addClass('disabledAutoFillPassword');
        }

        $(passObj).on('keyup', function() {
            var tmpPassword = $(this).val();
            var passwordLen = tmpPassword.length;

            for (var i = 0; i < passwordLen; i++) {
                if (tmpPassword[i] != '*') {
                    realPassword[i] = tmpPassword[i];
                }
            }
            realPassword = realPassword.slice(0, passwordLen);
            $(this).val(tmpPassword.replace(/./g, '*'));
        });
    }

    /**
     * Helper function
     * - Replace submit button to normal button to make sure everything works fine.
     */
    _helper.formSubmitListener = function(obj, settings) {
        var btnObj = (settings.submitButton == '') ? '.disableAutoFillSubmit' : settings.submitButton;

        $(btnObj).on('click', function(event) {
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
            $(settings.passwordFiled).attr('type', 'password');
        }

        $(settings.passwordFiled).val(realPassword.join(''));
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