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




    Ext.define('MyApp.view.YQL', {
        extend: 'Ext.Container',
        requires: ['MyApp.model.Feed'],

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
            layout: 'vbox',
            items: [
                {
                    xtype: 'panel',
                    id   : 'STOCK',
                    styleHtmlContent: true
                },
                {
                    xtype: 'panel',
                    id: 'M2',
                    styleHtmlContent: true
                },
                {
                    xtype : 'panel',
                    id: 'CRUD',
                    styleHtmlContent: true
                },
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    items: [
                    {
                        text: 'STOCK',
                        scope: this,
                        handler: function() {
                            //console.log("========="); // logs "Hello World"
                            var panel = Ext.getCmp('STOCK'),
                            tpl = new Ext.XTemplate([
                                    '<p>{span.content}</p>'
                            ]);
                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });
                            //var me = this;
                            //var options = this.stockLookup['SHA1'];
                            console.log(panel);
                            Ext.YQL.request({
                                query: "select * from html where url='http://www.google.com/finance?q=SHA:600036' and xpath='//div[@id=\"price-panel\"]/div/span/span'",
                                //query: options.query,
                                callback: function(success, response) {
                                    if (success && response.query && response.query.results) {    
                                        panel.setHtml(tpl.apply(response.query.results)+"END");
                                        //panel.setHtml(options.tpl.apply(response.query.results));

                                        //panel.setHtml("this is a testing");
                                    }
                                    else { 
                                        Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                                    }

                                    panel.getParent().unmask();
                                },
                            });
                        },
                    },
                    {
                        text: 'M2',
                        scope: this,
                        handler: function() {
                            var panel = Ext.getCmp('M2');
                            panel.getParent().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading...'
                            });                            
                            Ext.YQL.request({
                                query: "select * from html where url='http://www.google.com/finance?q=SHA:600036' and xpath='//div[@id=\"price-panel\"]/div/span/span'",
                                //query: options.query,
                                callback: function(success, response) {
                                    if (success && response.query && response.query.results) {    
                                        //panel.setHtml(tpl.apply(response.query.results));
                                        //panel.setHtml(options.tpl.apply(response.query.results));
                                        panel.setHtml("get the lasted M2 data from ifeng");
                                    }
                                    else { 
                                        Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                                    }

                                    panel.getParent().unmask();
                                },
                            });                            
                        },
                    },
                    {
                        text : 'CRUD',
                        scope: this,
                        handler: function(){
                            var panel = Ext.getCmp('CRUD');
                            /*
                            var feed = Ext.create('Feed', {id: 'Ed Spencer', name: 'ed@sencha.com', url:'url', target:'target'});
                            feed.save(); // will POST to the create url
                            */
                            //var store=Ext.StoreManager.get('MyStore');
                            var store=Ext.getStore('MyStore');
                            //add 
                            //store.add({id: 'Ed Spencer', name: 'ed@sencha.com', url:'url', target:'target'});
                            //console.log(store.getCount());

                            //QUERY
                            //var feed = store.findRecord('name','ed@sencha.com');
                            //console.log(feed.get('name')+feed.get('id'));

                            //DELETE
                            //store.remove(feed);
                            /* list all model1 */
                            /*
                            console.log(store.getCount());
                            var feeds = store.getRange(0, store.getCount());   
                              
                            for (var i = 0; i < feeds.length; i++) {   
                                var feed = feeds[i];  
                                console.log(feed); 
                                console.log(feed.getId());   
                            }  
                            */
                            //panel.setHtml(store.totalCount);

                            /* list all model2 */
                            store.each( function (record) {
                                console.log(record.get('url'));
                            })
                        }
                    }                    
                ]
            }]
        }
    });
});
