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
            //p.diagnostics=true;
            
            if (this.useAllPublicTables) {
                p.env = 'store://datatables.org/alltableswithkeys';
            }
            
            Ext.data.JsonP.request({
                url: this.yqlUrl,
                callbackKey: 'callback',
                params: p,
                callback: cfg.callback,
                scope: cfg.scope || window
            });
        }
    };




    Ext.define('MyApp.view.YQL', {
        extend: 'Ext.Container',
        
        stockLookup: {
            SHA1: {
                query: "select * from html where url='http://www.google.com/finance?q=SHA:600036' and xpath='//div[@id=\"price-panel\"]/div/span/span'",
                tpl: Ext.create('Ext.XTemplate', [
                    '<p>{span.content}</p>',
                ])            
            }
        },

        config: {
            scrollable: true,
            items: [
                {
                    xtype: 'panel',
                    id   : 'YQL',
                    styleHtmlContent: true
                },
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    items: [{
                        text: 'Load using YQL',
                        handler: function() {
                            var panel = Ext.getCmp('YQL'),
                                tpl = new Ext.XTemplate([
                                    '<p>{span.content}</p>'
                                ]);

                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });
                            //var me = this;
                            var options = this.stockLookup['SHA1'];

                            Ext.YQL.request({
                                //query: "select * from html where url='http://www.google.com/finance?q=SHA:600036' and xpath='//div[@id=\"price-panel\"]/div/span/span'",
                                query: options.query,
                                callback: function(success, response) {
                                    if (success && response.query && response.query.results) {    
                                        //panel.setHtml(tpl.apply(response.query.results));
                                        panel.setHtml(options.tpl.apply(response.query.results));

                                    }
                                    else { 
                                        Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                                    }

                                    panel.getParent().unmask();
                                }
                            });
                        }
                    }
                ]
            }]
        },

        makeYqlRequest: function(button) {
        }
    });
});
