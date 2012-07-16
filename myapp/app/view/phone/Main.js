Ext.define('MyApp.view.phone.Main', {
    extend: 'Ext.dataview.NestedList',
    requires: ['Ext.TitleBar'],

    id: 'mainNestedList',

    config: {
        fullscreen: true,
        title: 'MyApp',
        useTitleAsBackText: false,
        layout: {
            animation: {
                duration: 250,
                easing: 'ease-in-out'
            }
        },

        store: 'Demos',

        toolbar: {
            id: 'mainNavigationBar',
            xtype : 'titlebar',
            docked: 'top',
            title : 'MyApp',

            items: {
                xtype : 'button',
                id: 'viewSourceButton',
                hidden: true,
                align : 'right',
                ui    : 'action',
                action: 'viewSource',
                text  : 'Source'
            }
        }
    }
});