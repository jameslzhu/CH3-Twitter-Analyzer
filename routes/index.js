var fs = require('fs');
var express = require('express');
var twitter = require('twitter');

var router = express.Router();

var client = twitter({
    consumer_key: 'nUHYBfuwwi0p9PQgUptedxOPZ',
    consumer_secret: 'fjJmIgK91WT0QLYNoVfDr6FW5UffXDMXbH5El4IbhUiFvznHKZ',
    access_token_key: '410233756-ZaTPzvMhjApH4KuWzJAjihqhey6ZH5Yqt7hBN3bz',
    access_token_secret: 'lGelX2TFX7Z0MI6EP5SdiT6koa7OVhkTWxXvVGe7XcB2C'
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });

    client.get('search/tweets.json',
        {
            q: '#notmypresident',
            count: 100,
            geocode: "37.8716,-122.2727,1000km"
        },
        function(error, tweets, response) {
            fs.writeFile("./tweets.json", JSON.stringify(tweets.statuses), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });

            for (var i = 0; i < tweets.statuses.length; i++) {
                console.log(tweets.statuses[i].text);
            }
            console.log(error);
        }
    );
});

module.exports = router;
