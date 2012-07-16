Ext.define('MyApp.profile.Tablet', {
    extend: 'MyApp.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents']
    },

    isActive: function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch: function() {
        Ext.create('MyApp.view.tablet.Main');

        this.callParent();
    }
});
