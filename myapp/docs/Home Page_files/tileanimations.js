var TileAnimations = function () {
};

TileAnimations.FlipChildren = function (data) {
    var elm = $(this);
    var cVis = elm.data('curr-visible') || 'A';
    var el1, el2;

    if (cVis == 'A') {
        el1 = $(data.ChildA);
        el2 = $(data.ChildB);
    }
    else {
        el2 = $(data.ChildA);
        el1 = $(data.ChildB);
    }

    var w = el1.width();
    var l = parseInt(w / 2);

    //$(el1).animate({ 'width': '0px' }, 500,
    el2.css({ left: l });

    el1.animate({ width: 0, left: l }, 200, function () {
        el2.animate({ width: w, left: 0 }, 200, function () {
            elm.data('curr-visible', (cVis == 'A' ? 'B' : 'A'));
            el1 = null;
            el2 = null;
        });
    });

    return;
};
