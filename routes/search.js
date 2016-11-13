var async = require('async');
var express = require('express');
var twitter = require('twitter');
var googlemaps = require('@google/maps')

var router = express.Router();

GOOGLE_API_KEY = "AIzaSyA7bEwV-NVZczh0NjDes7O1TnyXtPBFkwI";

numTweets = 100;
berkeleyGeocode = "37.8716,-122.2727,1000km";

var client = twitter({
    consumer_key: 'nUHYBfuwwi0p9PQgUptedxOPZ',
    consumer_secret: 'fjJmIgK91WT0QLYNoVfDr6FW5UffXDMXbH5El4IbhUiFvznHKZ',
    access_token_key: '410233756-ZaTPzvMhjApH4KuWzJAjihqhey6ZH5Yqt7hBN3bz',
    access_token_secret: 'lGelX2TFX7Z0MI6EP5SdiT6koa7OVhkTWxXvVGe7XcB2C'
});

var googleMapsClient = googlemaps.createClient({ key: GOOGLE_API_KEY });

// Respond to GET /search?hashtag
// Expects the query parameter <hashtag>.
// Returns 
router.get("/", function(req, res, next) {
  var hashtag = req.query.hashtag;
  if (!hashtag) {
    res.status(400).send({error: "No query parameter 'hashtag' found."});
  } else {
    async.waterfall([
      function(callback) { fetchTweets(hashtag, numTweets, berkeleyGeocode, callback) },
      function(tweets, callback) { async.map(tweets.statuses, extractTweetTextLocation, callback) },
      function(parsedTweets, callback) { res.status(200).send({tweets: parsedTweets} ) }
    ]);
  }
});

function fetchTweets(hashtag, count, geocode, callback) {
  return client.get('search/tweets.json', {
      q: hashtag,
      count: count,
      geocode: geocode
    }, callback);
}

// Extract the tweet text and geolocation coordinates.
function extractTweetTextLocation(err, tweet, callback) {
  // Geocode an address. 
  if (!!tweet.coordinates) {
    console.log("Found coordinates on tweet.")
    return callback({
      text: tweet.text,
      coordinates: tweet.coordinates.coordinates.reverse()
    });
  } else {
    // If the tweet had no coordinates, geocode the human-readable user location.
    googleMapsClient.geocode({ address: tweet.user.location, components: "country:US"}, function(err, response) {
      if (!err) {
        console.log("No error, gotten address.");
        var location = response.json.results[0].geometry.location;
        var coords = [location.lat, location.lng];
        console.log(coords);
        callback({text: tweet.text, coordinates: coords});
      } else {
        console.log("Google error");
      }
    });
  }
}

module.exports = router;
