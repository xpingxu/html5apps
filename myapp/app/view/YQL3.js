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
            timeout: 60000,
            params: p,
            callback: cfg.callback,
            success: cfg.success,
            scope: cfg.scope || window
        });
    }
};



var mystore = Ext.getStore('MyStore');

Ext.define('Item', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['feed', 'title', 'url']
    }
});
var itemStore = Ext.create('Ext.data.Store', {
    id: 'ItemStore',
    model: 'Item',
    //sorters: 'firstName',    
});

Ext.define('MyApp.view.YQL3', {
    extend: 'Ext.tab.Panel',
    onReady: function() {
        console.log("this is the onReady()");
    },
    
    makeYQLCall: function(){

    },
    initialize: function(){
        console.log("this is the initialize()");
        var store=Ext.getStore('MyStore');
        
        //this method to load a particual item
        var item,
        /*
        item = store.findRecord('id','ZF-NR');
        Ext.YQL.request({
            query: item.get('url'),
            params: {'name':item.get('name')},
            success: function(response, request) { 
                if (response.query && response.query.results) { 
                    var results = response.query.results;
                    for(var i = 0; i<results.a.length; i++){
                        itemStore.add({feed: request.params.name, title: results.a[i].content, url: results.a[i].href});
                    };
                    console.log("sucess="+item.getId());        
                }
            },
        });   
        */
        item = store.findRecord('id','SF-TC4');
        Ext.YQL.request({
            query: item.get('url'),
            //params: {'name':item.get('name')},
            success: function(response, request) { 
                if (response.query && response.query.results) { 
                    var results = response.query.results;
                    for(var i = 0; i<results.a.length; i++){
                        itemStore.add({feed: 'ss', title: results.a[i].content, url: results.a[i].href});
                    };
                    console.log("sucess="+item.getId());        
                }
            },
            callback: function(success, response) {
                console.log (response.query);
            },
        });  
        /*
        item = store.findRecord('id','douban-gsbxsh');
        Ext.YQL.request({
            query: item.get('url'),
            params: {'name':item.get('name')},
            success: function(response, request) { 
                if (response.query && response.query.results) { 
                    var results = response.query.results;
                    for(var i = 0; i<results.a.length; i++){
                        itemStore.add({feed: request.params.name, title: results.a[i].content, url: results.a[i].href});
                    };
                    console.log("sucess="+item.getId());        
                }
            },
        }); 
        */                    
        /* this is a iteration method to load all feeds. but now it is not work due to the async call
        var feeds = store.getRange(0, store.getCount());   
        for (var i = 0; i < feeds.length; i++) {   
            var feed = feeds[i];
            Ext.YQL.request({
                query: feed.get('url'),
                callback: function(success, response) {
                    //console.log("feedId="+feed.getId());                       
                    if (success && response.query && response.query.results) {    
                        //console.log (response.query);
                        //feed.set('current',response.query.results);
                        //feed.applyCurrent();
                        //feed.set('update','Y');
                        //feed.save();
                        //console.log(response.query.results);
                        //console.log ("success:" + response.query);
                    }
                    else { 
                        feed.set('update','N');
                        feed.save();
                        //console.log ("failed:" + response.query);
                    }
                },
            });
        }   
        */   
    },    
    /*
    launch: function(){
        console.log("this is the launch");
        this.callParent(arguments);
        this.element.on('tap', this.onTap, this);
        var store=Ext.getStore('MyStore');
        var feeds = store.getRange(0, store.getCount());    
        for (var i = 0; i < feeds.length; i++) {               
            var feed = feeds[i];   
            console.log ("applycurrent="+feed.applyCurrent());
        }

    },   
    */    
    config: {
        id: 'yql3',
        activeItem: 2,
        tabBar: {
            docked: 'top',
            ui: 'neutral',
            layout: {
                pack: 'center'
            }
        },
        items: [{
            title: 'Simple',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            cls: 'demo-list',
            items: [{
                width: Ext.os.deviceType == 'Phone' ? null : 300,
                height: Ext.os.deviceType == 'Phone' ? null : 500,
                xtype: 'list',
                store: itemStore,
                itemTpl: '<div class="contact">{feed}<a href=\'{url}\' target=\'_blank\'><strong>{title}</strong></a></div>'
            }]
        }, 
        /*
        {
            title: 'Grouped',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            cls: 'demo-list',
            items: [{
                width: Ext.os.deviceType == 'Phone' ? null : 300,
                height: Ext.os.deviceType == 'Phone' ? null : 500,
                xtype: 'list',
                store: 'ListStore',
                itemTpl: '<div class="contact"><strong>current={current}</br></strong>template={template}</br>name={name}</div>',
                //grouped: true,
                indexBar: true
            }]
        }, 
        {
            title: 'Disclosure',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            cls: 'demo-list',
            items: [{
                width: Ext.os.deviceType == 'Phone' ? null : 300,
                height: Ext.os.deviceType == 'Phone' ? null : 500,
                xtype: 'list',
                ui: 'round',
                //grouped: true,
                pinHeaders: false,
                onItemDisclosure: function(record, btn, index) {
                    Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('firstName'), Ext.emptyFn);
                },
                store: mystore, //getRange(0, 9),
                itemTpl: '<div class="contact"><strong>current={current}</br></strong>template={template}</br>name={name}</div>'
            }]
        }
        */
        ]
    }
});
