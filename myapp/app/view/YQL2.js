/**
 * Demonstrates using YQL to fetch data from remote sources (in this case loading from the Sencha blog)
 */

Ext.require('Ext.data.JsonP', function() {
    Ext.YQL = {
        useAllPublicTables: true,
        yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
        request: function(cfg) {
            var p = cfg.params || {};
            p.q = cfg.query;
            p.format = 'json';
            p.diagnostics=true;
            /*
            if (this.useAllPublicTables) {
                p.env = 'store://datatables.org/alltableswithkeys';
            }
            */
            Ext.data.JsonP.request({
                url: this.yqlUrl,
                callbackKey: 'callback',
                params: p,
                callback: cfg.callback,
                scope: cfg.scope || window
            });
        }
    };
    var htmlstr = 'hello world';

    Ext.define('MyApp.view.YQL2', {
        extend: 'Ext.Container',
        config: {
            scrollable: true,
            items: [
                {
                    xtype: 'panel',
                    id   : 'YQL2',
                    styleHtmlContent: true,
                    items: [
                        {
                            html: htmlstr,
                        } 
                    ]                    
                },
                {
                    xtype: 'panel',
                    defaults: {
                        xtype: 'button',
                        style: 'margin: 0.1em',
                        flex : 1
                    },
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            text: 'Disable fields1',
                        }                       
                    ]
                }                 
            ]
        }
    });
});
