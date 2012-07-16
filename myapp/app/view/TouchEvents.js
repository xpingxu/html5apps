/**
 * Presents a large touch zone and reports all of the touch events fired when the user interacts with it
 */
Ext.define('MyApp.view.TouchEvents', {
    extend: 'Ext.Container',
    xtype: 'touchevents',
    
    requires: [
        'MyApp.view.touchevent.Info',
        'MyApp.view.touchevent.Logger',
        'MyApp.view.touchevent.Pad'
    ],

    initialize: function() {
        this.callParent(arguments);

        this.getEventDispatcher().addListener('element', '#touchpad', '*', this.onTouchPadEvent, this);
    },

    onTouchPadEvent: function(e, target, options, eventController) {
        var eventName = eventController.info.eventName;

        if (!eventName.match("mouse") && eventName !== 'click') {
            this.down('toucheventlogger').addLog(eventName);
        }
    }
});
