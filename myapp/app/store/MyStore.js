Ext.define('MyApp.store.MyStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.Feed'
    ],   
    config: {
        model: 'MyApp.model.Feed',
    	storeId: 'MyStore',
	    autoLoad: true,
	    autoSync: true,
	    listeners: {
	        load: function() {
	            console.log("loaded store");
	        }
	    },   
	    
	    data: [
	        { id: 'STOCK', name: 'STOCK',    url: 'select * from html where url=\'http://www.google.com/finance?q=SHA:600036\' and xpath=\'//div[@id=\"price-panel\"]/div/span/span\'', target: ''},
	        { id: 'M2', name: 'M2',    url: 'select * from html where url=\'http://app.finance.ifeng.com/data/mac/month_idx.php?type=015&symbol=01501\' and xpath=\' //div[@class="tab01"]/table/tr\'', target: ''},
	    ]	
  		
    }
});