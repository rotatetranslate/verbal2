angular.module('MyApp')
  .controller('VerbalCtrl', VerbalCtrl);

VerbalCtrl.$inject = ['$http', '$scope', '$rootScope', '$location', '$window', '$auth', 'Account'];

function VerbalCtrl($http, $scope, $rootScope, $location, $window, $auth, Account) {
  $scope.getAccessToken = function() {
    console.log('retreiving access token...');
    return $http.post('/token')
      .then(function(response) {
        $window.localStorage.setItem('bvToken', response.data.token);
      });
  }

  $scope.startSession = function() {
    console.log('starting analysis session...');
    return $http.post('/start', {token: $window.localStorage.getItem('bvToken')})
      .then(function(response) {
        console.log('response', response);
        return response.data.recordingId;
      })
  }

  $scope.upstream = function(id) {
    console.log('sending .wav for analysis...');
    return $http.post('/upstream', {
      token: $window.localStorage.getItem('bvToken'),
      recordingId: id,
      wav: $('#file').val()
    })
      .then(function(response) {
        console.log('analysis:', response.data.result);
        return response.data.result;
      })
  }

  $scope.analyzeFile = function() {
    return $scope.getAccessToken()
      .then(function() {
        return $scope.startSession()
          .then(function(id) {
            return $scope.upstream(id)
          })
      });
  }

  $scope.analyzeFile();
}
