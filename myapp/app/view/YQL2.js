/**
 * Demonstrates using YQL to fetch data from remote sources (in this case loading from the Sencha blog)
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
        /*
        initialize: function(){
            console.log("this is the initialize");
            var store=Ext.getStore('MyStore');
            var feed = store.findRecord('id','STOCK');
            //console.log(feed.get('url'));

            var tpl = new Ext.XTemplate(['<p>{span[0].content}{span[1].content}/p>']);
            

            Ext.YQL.request({
                //query: "select * from html where url='http://www.google.com/finance?q=SHA:600036' and xpath='//div[@id=\"price-panel\"]/div/span/span'",
                query: feed.get('url'),
                callback: function(success, response) {
                    if (success && response.query && response.query.results) {    
                        feed.set('current',response.query.results);
                        feed.set('update','Y');
                        feed.save();
                    }
                    else { 
                        feed.set('update','N');
                        feed.save();
                        Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                    }
                },
            });
        },   
        */     
        config: {
            //scrollable: true,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'  
            },

            items: [
            /*
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
                }, 
            */
                {
                    /*
                    layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    */
                    //cls: 'demo-list',    
                    //items: [{
                        //width: Ext.os.deviceType == 'Phone' ? null : 300,
                        //height: Ext.os.deviceType == 'Phone' ? null : 500,
                        xtype: 'list',
                        store: 'ListStore',
                        itemTpl: '<div class="contact"><strong>{firstName}</strong> {lastName}</div>',
                        //grouped: true,
                        //indexBar: true
                    //}]                                    
                }               
            ]
        }
    });
});
