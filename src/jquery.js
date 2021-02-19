(function($) {

    var disableautofill = require('./DisableAutoFill');

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
