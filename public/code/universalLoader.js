/**
 * Created by Doge on 10/24/2016.
 */
"use strict";

var map;

$(document).ready(function () {
    //for everything
    $("header").load("/info/header.html", null, loadSearch);
    $("footer").load("/info/footer.html");
    map = $K.map("#kartomap1", 800, 600);
    map.loadMap('/mapsrc/usa.svg', onMapLoad);
    $(".preventEnterSubmit").each(function (i, x) {
        $(x).keypress(function (e) {
            if (e.keyCode == "13") {
                e.preventDefault();
            }
        });
    });
});

function onMapLoad() {
    console.log("MAP LOADED");
    map.addLayer('layer0', {
        styles: {
            stroke: '#aaa',
            fill: getStateFill
        },
        mouseenter: function(d, path) {
            console.log(path.data()["path"]["data"]["label"]);
            console.log($(path)[0][0]);
            path.toFront();
            //$(path)[0][0].style.transformOrigin ="initial";
            //$(path)[0][0].style.transform ="scale(1.5)";
            //$(path)[0][0].style.zIndex ="5";
            //$(path)[0][0].style.zIndex ="5";
            //path.animate({size: 1.5*path.attr("width")}, 1000);
        },
        mouseleave: function(d, path) {
            //$(path)[0][0].style.transform ="scale(1.0)";
            //$(path)[0][0].style.zIndex ="1";
            path.animate({ fill: getStateFill(d) }, 1000);
        }
    });

    $(".kartograph svg").css("position", "static");
}

function getStateFill(stateObj) {
    return (stateObj.label < "MMM") ? "#222222" : "#cccccc";
}

function loadSearch() {
    /*
    $.get("/cardsFullList", null, function (arr) {
        $("#cardsearch").autocomplete({
            source: arr,
            appendTo: $("#suggestions"),
            delay: 100,
            minLength: 2
        });
    });

    $("#cardsearchForm").on("submit", goToCard);*/
}


//# sourceMappingURL=universalLoader.js.map