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

    // $scope.initMap = function() {
    //   $scope.map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 34.0312450, lng: -118.2665320},
    //     zoom: 10
    //   });

    //   var infoWindow = new google.maps.InfoWindow({map: $scope.map});

    //   locationService.getCurrentLocation()
    //   .then(function(pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent('Location Found.');
    //     $scope.map.setCenter(pos);
    //     $scope.map.setZoom(11);

    //     $scope.bounds = new google.maps.LatLngBounds();
    //     $scope.bounds = $scope.map.getBounds();
    //     console.log('bounds', $scope.bounds);
    //   })
    // }
    $scope.initMap = function() {
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0312450, lng: -118.2665320},
        zoom: 11,
        styles: [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#0F0919"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#FDCF6D"}]},{"elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#002FA7"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#E60003"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#FBFCF4"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#23D366"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#D41C1D"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#C57BBB"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"saturation":-100}]}]
      });
      var infoWindow = new google.maps.InfoWindow({map: $scope.map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          $scope.map.setCenter(pos);

          $scope.bounds = new google.maps.LatLngBounds();
          $scope.bounds = $scope.map.getBounds();
          console.log('bounds', $scope.bounds);

        }, function() {
          handleLocationError(true, infoWindow, $scope.map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, $scope.map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
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
        var contentString = '<h4><a href="http://twitter.com/'+ tweet.name + '/status/' + tweet.status_id +'" target="_blank">' + tweet.name + '</a></h4>' + '<p>' + tweet.text + '</p>' + '<p><b>Sentiment</b>: ' + tweet.sentiment.score + '</p>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
          animation: google.maps.Animation.DROP,
          map: $scope.map
        })
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    }

    // function addMarkers() {
    //   console.log('adding markers...');
    //   $scope.tweets.forEach(tweet => {
    //     var marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
    //       map: $scope.map
    //     })
    //   })
    // }

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

    $scope.text = 'bitsbytesLA1';
    $scope.submit = function() {
      return $scope.getTweets($scope.text)
        .then(function() {
          return $scope.createMarkers();
        })
        // .then(function() {
        //   return $scope.addMarkers();
        // })
      }

  }

})();

