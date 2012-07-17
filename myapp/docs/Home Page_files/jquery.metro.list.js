//LIST CONTROL
;(function ($, window, document, undefined) {
    var listDefaults = {
        multiselect: false,
        onselectionchanged: null, //fires when selection changes
        oncreate: null //fires when list is attached to an element
    };

    //CONSTRUCTOR
    function list() {
        this.selectedIndex = -1;
    }


    $.metro.attach('list', list);
    /* ############################### */
    /* ####  LIST PUBLIC METHODS  #### */
    /* ############################### */

    //create (BEGIN)

    function create(options) {
        this.settings = { };
        $.extend(this.settings, listDefaults, options);
        var i = 0;
        if (this.target().is('ul')) {
            this.target().addClass('metroui-list');
            fn_disableTextSelect(this.target()[0]);
            this.lastclickedIndex = -1;
            this.target().children().each(function() {
                var listItem = $(this);
                listItem.attr('metroui-list-idx', i++);

                //TODO: Is it necessary to set the value?                
                var itemValue = listItem.attr('metroui-list-val');
                if (!itemValue) {
                    listItem.attr('metroui-list-val', listItem.text());
                }

//                listItem.mousedown(function () {
//                    //document.onselectstart += fn_disableTextSelect;
//                });

                listItem.click(function(e) {
                    fn_itemClick.call($(this), e);
                    // document.onselectstart -= fn_disableTextSelect;
                });
            });
        }

        return this;
    }

    list.prototype['create'] = create;
    //create (END)

    //selectRange (BEGIN)

    function selectRange(startIndex, endIndex) {
        //Make sure startIndex is a number greater than -1
        if (isNaN(startIndex) || startIndex < 0)
            return;

        //Get the list of items in the items collection
        var listItems = this.target().children();
        var numItems = listItems.length;

        //Make sure startIndex is within the range of the collection
        if (startIndex >= numItems)
            return;

        //clear currently selected
        fn_clearSelected(this.target());

        //If endIndex is a number and is less than or greater than startIndex
        //we're selecting a range
        if (isNaN(endIndex)) {
            endIndex = startIndex;
        }

        for (var i = 0; i < numItems; i++) {
            var elem = $(listItems[i]);

            if ((i >= startIndex && i <= endIndex) || (i >= endIndex && i <= startIndex)) {
                elem.attr('selected', 1);
                elem.addClass('metroui-list-selected');
            }
        }
    }

    list.prototype['selectRange'] = selectRange;
    //selectRange (END)

    //selectSingle (BEGIN)

    function selectSingle(idx) {
        var elem = $(this.target().children()[idx]);
        var sel = elem.attr('selected');

        //clear all selected items
        fn_clearSelected(this.target());

        if (!sel) {
            elem.attr('selected', 1);
            elem.addClass('metroui-list-selected');
        }

        return this;
    }

    list.prototype['selectSingle'] = selectSingle;
    //selectSingle (END)

    //toggleSelected (BEGIN)

    function toggleSelected(idx) {
        if (!this.settings.multiselect) {
            return this.selectSingle(idx);
        }

        var elem = $(this.target().children()[idx]);
        var sel = elem.attr('selected');

        if (!sel) {
            elem.attr('selected', 1);
            elem.addClass('metroui-list-selected');
        } else {
            elem.removeAttr('selected');
            elem.removeClass('metroui-list-selected');
        }

        return this;
    }

    list.prototype['toggleSelected'] = toggleSelected;
    //toggleSelected (END);


    /* ################################# */
    /* ####  LIST INTERNAL METHODS  #### */
    /* ################################# */
    var fn_clearSelected = function(elem) {
        var listItems = elem.find('.metroui-list-selected');
        for (var i = 0; i < listItems.length; i++) {
            $(listItems[i]).removeAttr('selected');
            $(listItems[i]).removeClass('metroui-list-selected');
        }
    };

    var fn_itemClick = function(e) {
        var lst = this.parent().metro().list();
        var lastIdx = lst.lastClickedIndex;
        var currIdx = parseInt(this.attr('metroui-list-idx'));
        lst.lastClickedIndex = currIdx;

        //Multi-Select Disabled or no modifier selected
        if (!lst.settings.multiselect || (!e.ctrlKey && !e.shiftKey))
            return lst.selectSingle(currIdx);

        //Multi-Select Enabled AND...

        //...CTRL was pressed
        if (e.ctrlKey)
            return lst.toggleSelected(currIdx);

        //...SHIFT was pressed
        if (e.shiftKey)
            return lst.selectRange(lastIdx, currIdx);

        return lst;
    };

    var fn_disableTextSelect = function(target) {
        if (typeof target.onselectstart != "undefined") {
            target.onselectstart = function() { return false; };
        }
        else if (typeof target.style.MozUserSelect != "undefined") {
            target.style.MozUserSelect = "none";
        } else {
            target.onmousedown = function() { return false; };
            target.style.cursor = "default";
        }      
    };
    
})(jQuery, window, document);