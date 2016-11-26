angular.module('MyApp')
  .controller('TwitterCtrl', TwitterCtrl);

TwitterCtrl.$inject = ['locationService','$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

function TwitterCtrl(locationService, $http, $scope, $rootScope, $location, $window, $auth, Account) {
  console.log(locationService.getCurrentLocation());
  locationService.getCurrentLocation().then(function(pos) {

    $rootScope.currentUser.latLng = [pos.lat, pos.lng];
    console.log($rootScope.currentUser);
  }).catch(function(err) {
    console.log('err', err);
  })

}
