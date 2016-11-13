var express = require('express');
var googlemaps = require('@google/maps')

var router = express.Router();

GOOGLE_API_KEY = "AIzaSyA7bEwV-NVZczh0NjDes7O1TnyXtPBFkwI"

var googleMapsClient = googlemaps.createClient({ key: GOOGLE_API_KEY });

// Respond to GET /search?hashtag
// Expects the query parameter <hashtag>.
// Returns 
router.get('/search', function(req, res, next) {
  var hashtag = req.query.hashtag;
  if (!hashtag) {
    res.status(400).send({error: "No query parameter 'hashtag' found."});
  } else {
    tweets = fetchTweets(hashtag, 100, "37.8716,-122.2727,1000km");
    fs.writeFile("./tweets.json", JSON.stringify(tweets.statuses), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("tweets.json successfully saved.");
        }
    });
  }
});

// Extract the tweet text and geolocation coordinates.
function extractTweetTextAndLocation(tweet) {
  // Geocode an address. 
  filteredTweet = {
    text: tweet.text,
    coordinates: tweet.coordinates
  }

  if (!!tweet.coordinates) {
    return Promise.resolve({
      text: tweet.text,
      coordinates: tweet.coordinates
    });
  } else {
    // If the tweet had no coordinates, geocode the human-readable user location.
    return filteredTweet.coordinates = googleMapsClient.geocode({
        address: tweet.user.location
    }).asPromise()
    .then(function(value) {
      return Promise.resolve({
        text: tweet.text, 
        coordinates: value
      })
    })
    .catch(function(reason) {
      console.log("Tweet location not found (from tweet or user profile).");
      console.dir(reason);
    });
  }
}

function fetchTweets(hashtag, count, geocode) {
  return client.get('search/tweets.json',
    {
      q: hashtag,
      count: count,
      geocode: geocode
    },
    function(error, tweets, response) {
      // Extract tweets and locations (lat & long) 
      for (var i = 0; i < tweets.statuses.length; i++) {
        tweet = tweets.statuses[i];
        console.log(tweets.statuses[i].text);
      };
    }
  );
}

module.exports = router;
