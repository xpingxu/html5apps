; (function ($, window, document, undefined) {
    //Underlying metro-ui object
    var MetroUI = function(target) {
        var _target = target;
        this._controls = [];
        
        this.target = function () { return _target; };  
        _target.data('metro-instance', this);
    };
      
    //Element plugin
    $.fn.metro = function() {
        var result = new Array();
        var i = 0;
        
        this.each(function () {
            var $this = $(this);
            result[i] = $this.data('metro-instance') || new MetroUI($this);
            i++;
        });
        
        if(i == 1)
            return result[0];
        else
            return $(result);

    };

    //Global metro-ui functionality
    $.metro = {
        hook : function(methodName, method)
        {
            if(!(MetroUI.prototype[methodName]) && (typeof method == 'function')) {
                MetroUI.prototype[methodName] = method;
            }

            return $.metro;
        },
        attach : function (controlName, control) {
            if (!(MetroUI.prototype[controlName]) && (typeof control == 'function')) {
                control.prototype['target'] = function () { return this._target; };
                control.prototype['setTarget'] = function (elm) { this._target = elm; };
                MetroUI.prototype[controlName] = (function () {
                    if(!this._controls[controlName]) {
                        var ctl = new control(this.target());
                        ctl.setTarget(this.target());
                        this._controls[controlName] = ctl;
                    }
                    
                    return this._controls[controlName];
                });
            }
            
            return $.metro;
        },
        async : function(context, method)
        {          
            if(!(typeof method == 'function'))
                return ;
            
            var obj = context || {};
            var args = Array.prototype.slice.apply(arguments).slice(2);
            
            window.setTimeout(function () {
                    method.apply(obj, args);
                }, 0);         
        },
        asynccallback : function(context, method, callback)
        {
            if(!(typeof method == 'function'))
                    return ;
            
            var obj = context || {};
            var args = Array.prototype.slice.apply(arguments).slice(3);
            
            window.setTimeout(function () {
                    method.apply(obj, args);
                    if(callback && typeof callback == 'function')
                        callback.call(obj);
                }, 0);
        },
        mousepos : function (element, eventData) {
            var el = $(element);
            return {
                x : (eventData.pageX - el.offset().left),
                y : (eventData.pageY - el.offset().top)
            };
        },
        math : {
            clamp : function (val, min, max) {
                return Math.max(Math.min(val, max), min);
            }
        },
        disableSelect : function(target) {
            $(target).each(function()
            {
                if (typeof this.onselectstart != 'undefined') {
                      $(this).bind('selectstart', fn_returnFalse);
                }
                else if (typeof this.style.MozUserSelect != 'undefined') {
                    this.style.MozUserSelect = 'none';
                } else {
                    $(this).bind('mousedown', fn_returnFalse);
                    this.style.cursor = 'default';
                }
            });  
        },
        enableSelect : function(target) {
            $(target).each(function()
            {
                if (typeof this.onselectstart != 'undefined') {
                      $(this).unbind('selectstart', fn_returnFalse);
                }
                else if (typeof this.style.MozUserSelect != 'undefined') {
                    this.style.MozUserSelect = '';
                } else {
                    $(this).unbind('mousedown', fn_returnFalse);
                    this.style.cursor = 'default';
                }
            });      
        }
    };

    //Function to bind for false return
    var fn_returnFalse = function() { return false; };


})(jQuery, window, document);