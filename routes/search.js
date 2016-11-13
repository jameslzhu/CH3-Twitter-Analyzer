var express = require('express');
var googlemaps = require('@google/maps')

var router = express.Router();

GOOGLE_API_KEY = "AIzaSyA7bEwV-NVZczh0NjDes7O1TnyXtPBFkwI";

numTweets = 100;
berkeleyGeocode = "37.8716,-122.2727,1000km";

var googleMapsClient = googlemaps.createClient({ key: GOOGLE_API_KEY });

// Respond to GET /search?hashtag
// Expects the query parameter <hashtag>.
// Returns 
router.get('/search', function(req, res, next) {
  var hashtag = req.query.hashtag;
  if (!hashtag) {
    res.status(400).send({error: "No query parameter 'hashtag' found."});
  } else {
    // getTweets
    res.status(200).send({tweets: parsedTweets})
  }
});

function getTweets(hashtag, callback) {
  var parsedTweets = [];
    var tweets = fetchTweets(hashtag, numTweets, berkeleyGeocode, function(error, tweets, response) {
      for (var i = 0; i < tweets.statuses.length; i++) {
        tweet = tweets.statuses[i];
        extractTweetTextLocation(tweet, function(extractedTweet) {
          parsedTweets.push(extractedTweet);
        });
      };
      // Write tweets to file.
      fs.writeFile("./tweets.json", JSON.stringify(parsedTweets), function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("tweets.json successfully saved.");
          }
      });
    });
    console.log("All tweets acquired.");
    return callback(parsedTweets);
}

// Extract the tweet text and geolocation coordinates.
function extractTweetTextLocation(tweet, callback) {
  // Geocode an address. 
  if (!!tweet.coordinates) {
    return callback({
      text: tweet.text,
      coordinates: tweet.coordinates.coordinates.reverse()
    });
  } else {
    // If the tweet had no coordinates, geocode the human-readable user location.
    googleMapsClient.geocode({ address: tweet.user.location, components: "country:US"}, function(err, response) {
      if (!err) {
        var location = response.results[0].geometry.location;
        var coords = [location.lat, location.lng];
        callback({text: tweet.text, coordinates: coords})
      }
    });
  }
}

function fetchTweets(hashtag, count, geocode, callback) {
  return client.get('search/tweets.json', {
      q: hashtag,
      count: count,
      geocode: geocode
    }, callback);
}

module.exports = router;
