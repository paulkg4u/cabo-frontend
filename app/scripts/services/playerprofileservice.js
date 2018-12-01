'use strict';

/**
 * @ngdoc service
 * @name caboFrontendApp.PlayerProfileService
 * @description
 * # PlayerProfileService
 * Service in the caboFrontendApp.
 */
angular.module('caboFrontendApp')
  .service('PlayerProfileService', function ($http, $rootScope, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var playerProfile =  null;
    this.getPlayerProfile = function(){
      var deferred = $q.defer();
      if(playerProfile){
        deferred.resolve(playerProfile);
      }else{
        $http({
          method:'GET',
          url : $rootScope.baseURL+'player/player',
        }).then(function successCallback(response){
          playerProfile =  response.data;
          deferred.resolve(response.data);
        }, function errorCallback(error){
          deferred.reject(error)
        });
      }
      return deferred.promise;
    }
  });
