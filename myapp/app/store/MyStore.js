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
	        { id: 'M2', name: 'M2',    url: 'select * from html where url=\'http://app.finance.ifeng.com/data/mac/month_idx.php?type=015&symbol=01501\' and xpath=\' //div[@class="tab01"]/table/tr\'', target: '',template:'t1'},
	        { id: 'house-sh',name:'163 house shanghai',url:' select content from html where url=\'http://data.house.163.com/sh/productrank/day_all_all_all_todayflat_desc_1.html\' and xpath=\'//table[@class=\"sdphlist\"]/tr[3]/td[3]/p\'',target:'',template:'t2'},
	        { id: 'ZF-NR',name:'战法*女人',url:' select * from html where url=\"http://bbs.xineurope.com/forum-20-1.html\" and xpath=\'//tbody[starts-with(@id, \"normalthread_\")]/tr/th/a[1]\' limit 10',target:'',template:'t2'},
	        { id: 'SF-TC4',name:'搜房*汤臣',url:' select * from html where url=\"http://tangchenhaoyuanzj.soufun.com/bbs/\" and xpath=\'//a[@style=\"ttleft\"]\' limit 10',target:'',template:''},
	        { id: 'douban-gsbxsh',name:'豆瓣*古堡新海',url:' select * from html where url=\"http://www.douban.com/people/61325617/photos\" and xpath=\'//li[@class=\"mbtrdot\"]/a\' limit 10 ',target:'',template:''},
	    ]	
  		
    }
    

});