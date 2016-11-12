/**
 * Created by Doge on 10/24/2016.
 */
"use strict";

$(document).ready(function () {
    //for everything
    $("header").load("/info/header.html", null, loadSearch);
    $("footer").load("/info/footer.html");
    $(".preventEnterSubmit").each(function (i, x) {
        $(x).keypress(function (e) {
            if (e.keyCode == "13") {
                e.preventDefault();
            }
        });
    });
});

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