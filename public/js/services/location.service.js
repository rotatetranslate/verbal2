(function() {
  'use strict';

  angular.module('MyApp')
    .factory('locationService', locationService);

  locationService.$inject = ['$rootScope', '$q'];

  function locationService($rootScope, $q) {
    var service = {};

    service.getCurrentLocation = getCurrentLocation;
    service.getBounds = getBounds;

    function getCurrentLocation() {
      console.log('getting current location...');
      return $q((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            resolve(pos);
          })
      })
    }

    // function getBounds() {
    //   var geocoder = new google.maps.Geocoder;
    //   console.log('getting bounds...');
    //   getCurrentLocation()
    //   .then(function(pos) {
    //     console.log('pos', pos);
    //     geocoder.geocode({location: pos}, function(results, status) {
    //       console.log('results', results);
    //       var bounds = results[1].geometry.bounds;
    //       var boundArr = [
    //         bounds.b.b,
    //         bounds.f.b,
    //         bounds.b.f,
    //         bounds.f.f
    //       ];
    //       return boundArr.map(String);
    //     })
    //   })
    // }

    function getBounds() {
      var geocoder = new google.maps.Geocoder;
      console.log('getting bounds...');
      return getCurrentLocation()
      .then(function(pos) {
        return $q((resolve, reject) => {
          geocoder.geocode({location: pos}, function(results, status) {
            console.log('results', results);
            var bounds = results[1].geometry.bounds;
            var boundArr = [
              bounds.b.b,
              bounds.f.b,
              bounds.b.f,
              bounds.f.f
            ];
            console.log('BOUNDARR', boundArr);
            resolve(boundArr.map(String));
          })
        })
      })
    }

    return service;
  }

})();
