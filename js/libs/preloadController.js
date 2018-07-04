define(['jquery','createjs'], function () {

    this.preload = new createjs.LoadQueue(!1);

    function preloader() {
        var e = $("#preload"),
            t = $("#progress"),
            n = $(".container");

        //this.preload.installPlugin(createjs.Sound),
        preload.installPlugin(createjs.Sound);

        preload.on("complete", function () {
            setTimeout(function () {
                e.hide() // hide preload bar on preloading complete
                n.show() // show main container that contains all the content        
            }, 200)
        }, this),

            preload.on("progress", function () { // update progress of preloading
                var e = Math.floor(100 * preload.progress);
                $("div", t).css("width", e + "%")
            }, this),

            preload.loadManifest([{ // list of items in the manifest that needs to be preloaded
                src: "img/scan.gif"
            }, {
                src: "img/btn_ar.png"
            }, {
                src: "img/btn_ready.png"
            }, {
                src: "img/btn_more.png"
            }, {
                src: "img/renyu-poster.png"
            }, {
                src: "img/btn_back.png"
            }, {
                src: "img/openanim-landscape2.jpg"
            }
            ])
    }

    function debug() {
        console.log(isIphone);
        console.log(isAndroid);
    }

    return {
        debug: debug,
        preloader: preloader
    }

});