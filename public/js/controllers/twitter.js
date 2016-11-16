angular.module('MyApp')
  .controller('TwitterCtrl', TwitterCtrl);

TwitterCtrl.$inject = ['$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

function TwitterCtrl($http, $scope, $rootScope, $location, $window, $auth, Account) {

  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    $rootScope.currentUser.latLng = [pos.lat, pos.lng]
    console.log($rootScope.currentUser);
  });




}
