(function() {
  'use strict';

  angular.module('MyApp')
    .factory('locationService', locationService);

  locationService.$inject = ['$rootScope', '$q'];

  function locationService($rootScope, $q) {
    var service = {};

    service.getCurrentLocation = getCurrentLocation;

    function getCurrentLocation() {
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

    return service;
  }

})();
