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
});


module.exports = router;
