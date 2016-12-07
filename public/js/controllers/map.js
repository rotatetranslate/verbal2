(function() {
  'use strict';

  angular.module('MyApp')
    .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['locationService', '$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

  function MapCtrl(locationService, $http, $scope, $rootScope, $location, $window, $auth, Account) {

    $scope.initMap = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0312450, lng: -118.2665320},
        zoom: 8
      });

      var infoWindow = new google.maps.InfoWindow({map: map});

      locationService.getCurrentLocation()
      .then(function(pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location Found.');
        map.setCenter(pos);
        map.setZoom(14);
      })

    }

    $scope.initMap();

  }

})();

