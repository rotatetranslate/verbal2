(function() {
  'use strict';

  angular.module('MyApp')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['locationService', '$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

  function MapCtrl(locationService, $http, $scope, $rootScope, $location, $window, $auth, Account) {

    $scope.tweets = [];
    $scope.map;
    $scope.bounds;
    $scope.createMarkers = createMarkers;
    $scope.addMarkers = addMarkers;

    $scope.initMap = function() {
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0312450, lng: -118.2665320},
        zoom: 10
      });

      // var infoWindow = new google.maps.InfoWindow({map: $scope.map});

      locationService.getCurrentLocation()
      .then(function(pos) {
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location Found.');
        $scope.map.setCenter(pos);
        $scope.map.setZoom(11);

        $scope.bounds = new google.maps.LatLngBounds();
        $scope.bounds = $scope.map.getBounds();
        console.log('bounds', $scope.bounds);
      })

    }

    $scope.initMap();

    // only 1% of tweets have geo location, so:
    // get current user's location to set bounds of map
    // set tweet.geo to random coord within bounds
    function createMarkers() {
      console.log('creating markers...');
      $scope.tweets.forEach(tweet => {
        tweet.geo = [
          Math.random() * ($scope.bounds.f.b - $scope.bounds.f.f) + $scope.bounds.f.f,
          Math.random() * ($scope.bounds.b.b - $scope.bounds.b.f) + $scope.bounds.b.f
          ];
        var contentString = '<h4><a href="http://twitter.com/'+ tweet.name + '">' + tweet.name + '</a></h4>' + '<p>' + tweet.text + '</p>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
          map: $scope.map
        })
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    }

    function addMarkers() {
      console.log('adding markers...');
      $scope.tweets.forEach(tweet => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
          map: $scope.map
        })
      })
    }

    // $scope.addMarkers();

    $scope.getTweets = function(keyword) {
      console.log('getting tweets...');
      return $http.post('/twittersearch', {
        keyword: keyword
      })
      .then(function(response) {
        console.log(response);
        $scope.tweets = response.data;
      })
    }

    $scope.text = 'Enter search term';
    $scope.submit = function() {
      return $scope.getTweets($scope.text)
        .then(function() {
          return $scope.createMarkers();
        })
        .then(function() {
          return $scope.addMarkers();
        })
      }

  }

})();

