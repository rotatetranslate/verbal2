var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// lat, lng, lat2, lng2
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];

// var stream = T.stream('statuses/filter', { locations: sanFrancisco })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

function getLocationStream(req, res, next) {
  var location = req.body.bounds;
  var stream = T.stream('statuses/filter', {locations: location})
  return stream.on('tweet', function(tweet) {
    console.log(tweet);
    // res.send(tweet);
  })
}


module.exports = {
  getLocationStream
}
