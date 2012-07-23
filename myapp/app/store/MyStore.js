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
	        { id: 'STOCK', name: 'STOCK',    url: 'select * from html where url=\'http://www.google.com/finance?q=SHA:600036\' and xpath=\'//div[@id=\"price-panel\"]/div/span/span\'', target: '',template:'<tpl for="span"><p>{content}</p></tpl>'},
	        { id: 'M2', name: 'M2',    url: 'select * from html where url=\'http://app.finance.ifeng.com/data/mac/month_idx.php?type=015&symbol=01501\' and xpath=\' //div[@class="tab01"]/table/tr\'', target: '',template:''},
	        { id: 'house-sh',name:'163 house shanghai',url:' select content from html where url=\'http://data.house.163.com/sh/productrank/day_all_all_all_todayflat_desc_1.html\' and xpath=\'//table[@class=\"sdphlist\"]/tr[3]/td[3]/p\'',target:'',template:''}
	    ]	
  		
    }
    

});