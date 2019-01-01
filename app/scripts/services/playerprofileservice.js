'use strict';

/**
 * @ngdoc service
 * @name caboFrontendApp.PlayerProfileService
 * @description
 * # PlayerProfileService
 * Service in the caboFrontendApp.
 */
angular.module('caboFrontendApp')
  .service('PlayerProfileService', function ($http, $rootScope, $q, OAuth, OAuthToken, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var playerProfile =  null;
    this.getPlayerProfile = function(){
      var deferred = $q.defer();
      $http({
        method:'GET',
        url : $rootScope.baseURL+'player/player/',
      }).then(function successCallback(response){
        playerProfile =  response.data;
        deferred.resolve(response.data);
      }, function errorCallback(error){
        deferred.reject(error)
        OAuth.getRefreshToken().then(function(response){
          delete $rootScope.$storage.token;
          $rootScope.$storage.token = response.data;
          OAuthToken.setToken(response.data);
        }, function(respone){
          OAuthToken.removeToken();
          $location.path("/signIn" );
        });
      });
      // if(playerProfile){
      //   deferred.resolve(playerProfile);
      // }else{
        
      // }
      return deferred.promise;
    }
  });
