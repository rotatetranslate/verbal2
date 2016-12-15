var Twit = require('twit');
var sentiment = require('sentiment');

var T = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// // lat, lng, lat2, lng2
// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
// var losAngeles = ['-118.62', '33.75', '-117.92', '34.32'];

// var stream = T.stream('statuses/filter', { locations: losAngeles })

// stream.on('tweet', function (tweet) {
//   if (tweet.geo !== null) {
//     console.log(tweet)

//   }
// })

function getLocationStream(req, res, next) {
  var location = req.body.bounds;
  var stream = T.stream('statuses/filter', {locations: location})
  return stream.on('tweet', function(tweet) {
    console.log(tweet);
    // res.send(tweet);
  });
}

function search(req, res, next) {
  var keyword = req.body.keyword;
  T.get('search/tweets', { q: keyword, count: 20 }, function(err, data, response) {
  console.log(data.statuses)
  // for each tweet create a tweet object with required data
  var tweets = data.statuses.map(tweet => {
    return {text: tweet.text, name: tweet.user.screen_name, status_id: tweet.id_str, geo: tweet.geo, sentiment: sentiment(tweet.text)}
  })
  res.send(tweets);
  })
}


// // https://github.com/ryanknights/twitter-node-socket-io
// function twitterStream(io, T) {
//   // returns a new twit stream for passed keyword
//   function createStream(keyword) {
//     var stream = T.stream('statuses/filter', {track: keyword});

//     stream.on('tweet', function(tweet) {
//       if (tweet.geo !== null) {
//         var tweetData = {
//           "text" : tweet.text,
//           "name" : tweet.user.screen_name,
//           "lat" : tweet.geo.coordinates[0],
//           "lng" : tweet.geo.coordinates[1],
//           "sentiment" : sentiment(tweet.text)
//         }

//         io.sockets.emit('twitter-stream', tweetData);
//       }
//     });

//     stream.on('connect', function() {
//       console.log('connected to twitter stream using keyword', keyword);
//     });

//     stream.on('disconnect', function() {
//       console.log('disconnected from twitter stream using keyword', keyword);
//     });

//     return stream;
//   }

//   var stream = null,
//       currentKeyword = null,
//       currentSockets = 0;

//   io.sockets.on('connection', function(socket) {
//     currentSockets++;
//     socket.emit('connected', currentKeyword);
//     console.log('socket connected');

//     if (currentKeyword !== null && stream === null) {
//       stream = createStream(currentKeyword);
//     }

//     socket.on('disconnect', function() {
//       currentSockets--;
//       console.log('Socket disconnected');
//     })

//     if (stream !== null && currentSockets <= 0) {
//       stream.stop();
//       stream = null;
//       currentSockets = 0;
//       console.log('no active sockets, disconnecting from stream');
//     }
//   });

//   socket.on('keyword-change', function(keyword) {
//     if (stream !== null) {
//       stream.stop();
//       console.log('stream stopped');
//     }

//     stream = createStream(keyword);
//     currentKeyword = keyword;
//     io.sockets.emit('keyword-changed', currentKeyword);
//     console.log('stream restarded with keyword: ', currentKeyword);

//   })

// }

module.exports = {
  getLocationStream,
  search
}

