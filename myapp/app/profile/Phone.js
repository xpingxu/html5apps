Ext.define('MyApp.profile.Phone', {
    extend: 'MyApp.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main', 'TouchEvents']
    },

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },

    launch: function() {
        Ext.create('MyApp.view.phone.Main');

        this.callParent();
    }
});
