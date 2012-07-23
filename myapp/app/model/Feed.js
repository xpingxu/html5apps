Ext.define('MyApp.model.Feed', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id',          type: 'string'},
            {name: 'name',        type: 'string'},
            {name: 'url',      type: 'string'},
            {name: 'target',   type: 'string'},
            {name: 'current',   type:'object'},
            {name: 'update',    type:'string'},
            {name: 'template',  type:'string'},
            {name: 'test', type:'string'}
        ],
        proxy: {
            type: 'localstorage',
            //id: 'my-model-localstorage-id'
        }
    },

    applyCurrent: function() {
        console.log ('tempalte='+this.get('template'));
        console.log ('current='+this.get('current'));
        var tpl = new Ext.XTemplate([this.get('template')]);
        var html =  tpl.apply(this.get('current'));
        console.log ('html='+html);
        return html;
    }        
});
