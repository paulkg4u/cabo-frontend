'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('SigninCtrl', function ($scope, Facebook, $rootScope, $http, $location, OAuth, OAuthToken) {

    if(OAuth.isAuthenticated() ==true){
      $location.path( "/" );
    }
    $scope.login_fb = function () {
      Facebook.login().then(function (response) {
        console.log(response);
        $scope.getConvertToken('facebook', response.authResponse.accessToken);
      }, function (error) {
        $scope.loginPlatform = 'facebook';
        console.log("error", error);
      });
    }

    
    $scope.getConvertToken = function (backend, token) {
      console.log("calling convert token");
      $rootScope.loadSpinner = true;
      $http({
          method: 'POST',
          url: $rootScope.baseURL + 'o/convert-token/',
          data: {
              'client_id': 'CkOQ7ENKi7oIKzKTIJTxAl4ZGPfob2nJxV5YI63t',
              'client_secret': 'noKjq9SPAGWZHYgPBLhj7BDVgID6KDEHvA4s49zVdf0PXtreqtXSZ2223t624sH6fxfnB2RTvepzxABgm4JJKY1PgQmLl4GmW6xL8m6NlRMHgqaLPNIufTb6RtdFr3LP',
              'grant_type': 'convert_token',
              'backend': backend,
              'token': token

          }
      }).then(function successCallback(response) {
          $rootScope.$storage.fbLogin = true;
          OAuthToken.setToken(response.data);
          
          $location.path('/');
          // UserService.getUser().then(function (result) {
          //     if (result !== 'service_running') {
          //         UserProfile.put(result);
          //         switch (UserProfile.getRole()) {
          //             case 'student':
          //                 $state.go('student.dashboard');
          //                 break;
          //             case 'teacher':
          //                 $state.go('teacher.dashboard').then(function () {
          //                     $rootScope.loadSpinner = false;
          //                 });
          //                 break;
          //             case 'administrator':
          //                 $state.go('admin.dashboard').then(function () {
          //                     $rootScope.loadSpinner = false;
          //                 });
          //                 break;
          //             default:
          //                 $rootScope.showMessage(false, 'Error!!');
          //         }
          //     }

          // }, function (response) {
          //     console.log(response);
          //     $rootScope.loadSpinner = false;
          //     $rootScope.showMessage(false, 'Error getting Token Owner!!');
          // });
      }, function errorCallback(response) {
          console.log(response);
          $rootScope.loadSpinner = false;
      });
  };



    $scope.googleSignIn = function () {

    }

  });
