angular.module('MyApp')
  .controller('TwitterCtrl', TwitterCtrl);

TwitterCtrl.$inject = ['locationService','$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

function TwitterCtrl(locationService, $http, $scope, $rootScope, $location, $window, $auth, Account) {
  locationService.getCurrentLocation()
  .then(function(pos) {
    $rootScope.currentUser.latLng = [pos.lat, pos.lng];
    console.log($rootScope.currentUser);
    // make google maps geocode request to get latlng bounds from single latlng
    // pass latlng bounds to twitter controller to filter stream by current location
  }).catch(function(err) {
    console.log('err', err);
  })

  $scope.locationStream = function() {
    return locationService.getBounds()
    .then(function(bounds) {
      console.log(bounds);
      return $http.post('/locationstream', {
        bounds: bounds
      })
      .then(function(response) {
        console.log(response);
      })
    }).catch(function(err) {
      console.log('err', err);
    })
  }

  $scope.locationStream();

}
