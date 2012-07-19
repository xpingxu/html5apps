Ext.define('MyApp.model.Feed', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id',          type: 'string'},
            {name: 'name',        type: 'string'},
            {name: 'url',      type: 'string'},
            {name: 'target',   type: 'string'}
        ],
        proxy: {
            type: 'localstorage',
            //id: 'my-model-localstorage-id'
        }
    }
});
