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

    client.get('search/tweets', {
            q: '#notmypresident',
            geocode: '37.871975 -122.258862 5mi'
        },
        function(error, tweets, response) {
            console.log(tweets);
        }
    );
});

module.exports = router;
