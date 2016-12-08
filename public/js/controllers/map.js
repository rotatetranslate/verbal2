(function() {
  'use strict';

  angular.module('MyApp')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['locationService', '$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

  function MapCtrl(locationService, $http, $scope, $rootScope, $location, $window, $auth, Account) {
    // hardcoded data to demo concept
    $scope.tweets = [
      {
        name: 'RandyJayBurrell',
        text: 'Man what a day on set 🙌 Feeling Great! Got to work opposite of Oscar winner JK Simmons on the… https://t.co/qUfglEhKBe',
        geo: [ 34.0837999, -118.2737 ]
      },
      {
        name: 'Proviscalling',
        text: 'Join the Providence Health & Services team! See our latest #job opening here: https://t.co/X5sX1FLj8E #Torrance, CA #Hiring',
        geo: [33.83, -118.33]
      },
      {
        name: 'Jeremy_Pessoa',
        text: 'Post-surgery meal with my little brother. @ West Hills Hospital... https://t.co/IVMcsFu9TP',
        geo: [ 34.20301, -118.6286 ]
      },
      {
        name: 'PreacherWalling',
        text: 'Last house group meeting of the year for our Wednesday night student Bible study!… https://t.co/C94tdCOTps',
        geo: [34.04629439, -118.71452126]
      },
      {
        name: 'TrapTheGOD',
        text: 'Orlando Salido got more losses than the total fights Lomachenko has had in his professional career and he still was able to beat him 😂😂',
        geo: [ 34.0145277, -118.35329483 ]
      },
      {
        name: 'AlphaRwirangira',
        text: 'My brother from another mother never disappoints @TheRealTheBen #rohoyangye video lyrics out… https://t.co/GSSvDuKC1I',
        geo: [ 34.0522, -118.243 ]
      },
      {
        name: 'TopherAdam',
        text: 'So sad this ride is leaving. @ The Twilight Zone Tower of Terror https://t.co/cmG9ggHMrp',
        geo: [33.80703706, -117.9170742]
      },
      {
        name: 'monireno',
        text: 'Have a heart that never hardens, and a temper that never tires, and a touch that never hurts. - Charles Dickens https://t.co/iQOLyR3b8g',
        geo: [ 37.69956479, -123.01184074 ]
      },
      {
        name: 'kepamer',
        text: 'Picture of Mt. Fuji reflected in Lake Kawaguchi, Japan https://t.co/K8DnP4Y9ci',
        geo: [ 37.6991098, -123.01184174 ]
      },
      {
        name: 'Ciscogiii',
        text: '#sanfrancisco #sunrise #goldengatebridge #research #nosleep #4amwakeup #noregrets @ Golden Gate… https://t.co/7aUHioQkDj',
        geo: [ 37.8183, -122.47846 ]
      }
    ]

    $scope.initMap = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0312450, lng: -118.2665320},
        zoom: 10
      });

      // var infoWindow = new google.maps.InfoWindow({map: map});

      // locationService.getCurrentLocation()
      // .then(function(pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent('Location Found.');
      //   map.setCenter(pos);
      //   map.setZoom(10);
      // })

      $scope.createMarkers = function() {
      $scope.tweets.forEach(tweet => {

        var contentString = '<h4><a href="http://twitter.com/'+ tweet.name + '">' + tweet.name + '</a></h4>' + '<p>' + tweet.text + '</p>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
          map: map
        })
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    }

    $scope.createMarkers();



    }

    $scope.initMap();


    // $scope.addMarkers = function() {
    //   $scope.tweets.forEach(tweet => {
    //     var marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(tweet.geo[0], tweet.geo[1]),
    //       map: map
    //     })
    //   })
    // }

    // $scope.addMarkers();

  }

})();

