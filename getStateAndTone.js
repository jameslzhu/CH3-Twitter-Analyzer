/**
 * Created by Doge on 11/12/2016.
 */

var creds = require("./creds.js");
var toner = require("./getTone.js");
var http = require('https');
module.exports = {};

function getState(jsonDat) {
    var adrComp = jsonDat["results"][0]["address_components"];
    for (var iii = 0; iii < adrComp.length; iii++) {
        if (adrComp[iii]["types"].indexOf("administrative_area_level_1") > -1) { //state
            return (adrComp[iii]["long_name"]);
        }
    }
}

function appendTweetToDict(lat, long, tweet, dic) {
    var options = {
        host: 'maps.googleapis.com',
        path: `/maps/api/geocode/json?latlng=${lat},${long}&key=${creds.googleKey}`
    };
    http.request(options, function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            var jsonLocData = JSON.parse(str);
            var state = getState(jsonLocData);
            if (!dic.hasOwnProperty(state)) {
                dic[state] = [];
            }
            toner.getToneOfText(tweet, dic[state], function () {
                console.log(dic["California"])
            });
        });
    }).end();
}
var kq = {};
appendTweetToDict("36.7783", "-119.4179", "Hello, mrRRRRy name is George.", kq);
appendTweetToDict("36.7783", "-119.4179", "Hello, today is a nice day.", kq);

