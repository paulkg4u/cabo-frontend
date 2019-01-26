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
      }, function errorCallback(response) {
          console.log(response);
          $rootScope.loadSpinner = false;
      });
  };



    $scope.googleSignIn = function () {
      $scope.googleSignInClicked = true;
        if($scope.googleAccountDetails != null){
            $scope.authenticateGoogleUser();
        }else{
            googleAuth = gapi.auth2.getAuthInstance();
            googleAuth.signIn();
        }
    }

    $scope.googleSignInClicked = false;
    var googleAuth;
    $scope.googleAccountDetails = null;
    gapi.load('auth2', function () {
        gapi.auth2.init({'client_id': '338150241996-ao6ts4cgs1ib85ttuv6mubslb0244tso.apps.googleusercontent.com'}).then(function successinit(auth2) {
            googleAuth = gapi.auth2.getAuthInstance();
            googleAuth.isSignedIn.listen(getGoogleUser);
            if (auth2.isSignedIn.get()) {
                var googleUser = auth2.currentUser.get();
                console.log(auth2);
                onSignIn(googleUser);
                // auth2.signOut();

            }
        });
    });

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        var authDetails = googleUser.getAuthResponse();
        $scope.googleAccountDetails = googleUser;
        if ($scope.googleSignInClicked) {
            for (var eachObject in googleUser){
                if(googleUser[eachObject].hasOwnProperty('access_token')){
                    $scope.getConvertToken('google-plus', googleUser[eachObject].access_token);        
                }
            };
            
        }

    }

    var getGoogleUser = function (isSignedIn) {
        if (isSignedIn) {
            var googleUser = googleAuth.currentUser.get();
            onSignIn(googleUser);
        }
    };

    $scope.authenticateGoogleUser  =function(){
        for (var eachObject in $scope.googleAccountDetails){
            if($scope.googleAccountDetails[eachObject].hasOwnProperty('access_token')){
                $scope.getConvertToken('google-plus', $scope.googleAccountDetails[eachObject].access_token);        
            }
        };
    };
  });
