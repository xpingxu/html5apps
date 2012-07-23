/**
 * Demonstrates how to create a simple List based on inline data.
 * First we create a simple Contact model with first and last name fields, then we create a Store to contain
 * the data, finally we create the List itself, which gets its data out of the Store
 */
Ext.define('Contact', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['firstName', 'lastName']
    }
});

Ext.create('Ext.data.Store', {
    id: 'ListStore',
    model: 'Contact',
    sorters: 'firstName',
    grouper: function(record) {
        return record.get('firstName')[0];
    },
    data: [
        {firstName: 'Julio', lastName: 'Benesh'},
        {firstName: 'Julio', lastName: 'Minich'},
        {firstName: 'Tania', lastName: 'Ricco'},
        {firstName: 'Odessa', lastName: 'Steuck'},
        {firstName: 'Nelson', lastName: 'Raber'},
        {firstName: 'Tyrone', lastName: 'Scannell'},
        {firstName: 'Allan', lastName: 'Disbrow'},
        {firstName: 'Cody', lastName: 'Herrell'},
        {firstName: 'Julio', lastName: 'Burgoyne'},
        {firstName: 'Jessie', lastName: 'Boedeker'},
        {firstName: 'Allan', lastName: 'Leyendecker'},
        {firstName: 'Javier', lastName: 'Lockley'},
        {firstName: 'Guy', lastName: 'Reasor'},
        {firstName: 'Jamie', lastName: 'Brummer'},
        {firstName: 'Jessie', lastName: 'Casa'},
        {firstName: 'Marcie', lastName: 'Ricca'},
        {firstName: 'Gay', lastName: 'Lamoureaux'},
        {firstName: 'Althea', lastName: 'Sturtz'},
        {firstName: 'Kenya', lastName: 'Morocco'},
        {firstName: 'Rae', lastName: 'Pasquariello'},
        {firstName: 'Ted', lastName: 'Abundis'},
        {firstName: 'Jessie', lastName: 'Schacherer'},
        {firstName: 'Jamie', lastName: 'Gleaves'},
        {firstName: 'Hillary', lastName: 'Spiva'},
        {firstName: 'Elinor', lastName: 'Rockefeller'},
        {firstName: 'Dona', lastName: 'Clauss'},
        {firstName: 'Ashlee', lastName: 'Kennerly'},
        {firstName: 'Alana', lastName: 'Wiersma'},
        {firstName: 'Kelly', lastName: 'Holdman'},
        {firstName: 'Mathew', lastName: 'Lofthouse'},
        {firstName: 'Dona', lastName: 'Tatman'},
        {firstName: 'Clayton', lastName: 'Clear'},
        {firstName: 'Rosalinda', lastName: 'Urman'},
        {firstName: 'Cody', lastName: 'Sayler'},
        {firstName: 'Odessa', lastName: 'Averitt'},
        {firstName: 'Ted', lastName: 'Poage'},
        {firstName: 'Penelope', lastName: 'Gayer'},
        {firstName: 'Katy', lastName: 'Bluford'},
        {firstName: 'Kelly', lastName: 'Mchargue'},
        {firstName: 'Kathrine', lastName: 'Gustavson'},
        {firstName: 'Kelly', lastName: 'Hartson'},
        {firstName: 'Carlene', lastName: 'Summitt'},
        {firstName: 'Kathrine', lastName: 'Vrabel'},
        {firstName: 'Roxie', lastName: 'Mcconn'},
        {firstName: 'Margery', lastName: 'Pullman'},
        {firstName: 'Avis', lastName: 'Bueche'},
        {firstName: 'Esmeralda', lastName: 'Katzer'},
        {firstName: 'Tania', lastName: 'Belmonte'},
        {firstName: 'Malinda', lastName: 'Kwak'},
        {firstName: 'Tanisha', lastName: 'Jobin'},
        {firstName: 'Kelly', lastName: 'Dziedzic'},
        {firstName: 'Darren', lastName: 'Devalle'},
        {firstName: 'Julio', lastName: 'Buchannon'},
        {firstName: 'Darren', lastName: 'Schreier'},
        {firstName: 'Jamie', lastName: 'Pollman'},
        {firstName: 'Karina', lastName: 'Pompey'},
        {firstName: 'Hugh', lastName: 'Snover'},
        {firstName: 'Zebra', lastName: 'Evilias'}
    ]
});

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



var mystore = Ext.getStore('MyStore');
Ext.define('MyApp.view.YQL3', {
    extend: 'Ext.tab.Panel',
    launch: function(){
        console.log("this is the initialize");
        var feeds = store.getRange(0, store.getCount());   
        for (var i = 0; i < feeds.length; i++) {   
            var feed = feeds[i];   
            console.log("feedId="+feed.getId());   
            Ext.YQL.request({
                query: feed.get('url'),
                callback: function(success, response) {
                    if (success && response.query && response.query.results) {    
                        feed.set('current',response.query.results);
                        feed.set('update','Y');
                        feed.save();
                        console.log(response.query.results);
                        console.log ("success:" + response.query);
                    }
                    else { 
                        feed.set('update','N');
                        feed.save();
                        console.log ("failed:" + response.query);
                    }
                },
            });
        }      
    },    
    initialize: function(){
        var store=Ext.getStore('MyStore');
        var feeds = store.getRange(0, store.getCount());    
        for (var i = 0; i < feeds.length; i++) {               
            var feed = feeds[i];   
            console.log ("applycurrent="+feed.applyCurrent());
        }

    },       
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
                store: 'ListStore',
                itemTpl: '<div class="contact"><strong>{firstName}</strong> {lastName}</div>'
            }]
        }, {
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
                itemTpl: '<div class="contact"><strong>{firstName}</strong> {lastName}</div>',
                grouped: true,
                indexBar: true
            }]
        }, {
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
                itemTpl: '<div class="contact"><strong>{current}</strong> {update}</div>'
            }]
        }]
    }
});
