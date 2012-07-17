//Loop Executor
;(function ($) {
    var perform = function(options, action, data) {
            if (typeof action == 'function' && options.interval) {
                var elm = this.target();
                window.setInterval(function() {
                    action.call(elm, data);
                }, options.interval);

            }
           return this.target();
        };
    
    $.metro.hook('perform', perform); 
})(jQuery);

//LiveTile
;(function ($) {
    $.metro.LiveTile = function(){};
    
    $.metro.LiveTile.SlideUpDown = function () {
            var pos = this.data('metro-sl-up-down') || 0;
           
            if(pos == 0) {
                this.slideUp(300);
                pos = 1;
            } else {
                this.slideDown(300);
                pos = 0;
            }

            this.data('metro-sl-up-down', pos);

    };
    
    $.metro.LiveTile.FadeOutIn = function () {
            var state = this.data('metro-fa-out-in') || 0;
           
            if(state == 0) {
                this.fadeOut(500);
                state = 1;
            } else {
                this.fadeIn(500);
                state = 0;
            }

            this.data('metro-fa-out-in', state);
    };


})(jQuery);