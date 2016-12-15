var request = require('request');
var fs = require('fs');

var apiKey   = process.env.BV_KEY;
var tokenUri = 'https://token.beyondverbal.com/token';
var baseUri  = 'https://apiv3.beyondverbal.com/v3/recording/';

function getToken(req, res, next) {
  return request.post({
    url: tokenUri,
    form: {
      grant_type: "client_credentials",
      apiKey: apiKey
    }
  }, function(err, response, body) {
      if (err) {
        console.log('error:', err);
      } else {
        res.send({token: JSON.parse(body).access_token});
      }
  });
}

function startRequest(req, res, next) {
  // console.log(BODY', req.body);
  return request.post({
    url: `${baseUri}start`,
    headers: {'Authorization': `Bearer ${req.body.token}`},
    body: JSON.stringify({
      "dataFormat": {"type": "WAV"}
    })
  }, function(err, response, body) {
    if (err) {
      console.log('error:', err);
    } else {
      res.send(JSON.parse(body));
    }
  })
}

function upstreamRequest(req, res, next) {
  console.log('BODY', req.body);
  return request.post({
    url: `${baseUri+req.body.recordingId}`,
    headers: {'Authorization': `Bearer ${req.body.token}`},
    // body: req.body.wav
    // https://www.youtube.com/watch?v=EPRoAVKa2U8
    body: fs.createReadStream('/Users/adamberro/Downloads/paula_converted.wav')
  }, function(err, response, body) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log('response ', response);
      console.log('body ', body);
      res.send(JSON.parse(body));
    }
  })
}

module.exports = {
  getToken,
  startRequest,
  upstreamRequest
}









