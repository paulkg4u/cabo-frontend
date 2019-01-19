'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('MainCtrl', function (OAuth, $location, $rootScope, $http, $scope, PlayerProfileService) {
    $scope.displayActions = true;
    $scope.displayJoinRoom = false;
    $scope.roomID = "";
    console.log(OAuth.isAuthenticated());

    PlayerProfileService.getPlayerProfile().then(function successCallBack(response) {
      $scope.player = response;
      if ($scope.player) {
        $scope.playerFetch = "";
      }
    }, function errorCallBack(error) {
      console.log("could not fetch profile")
    })

    if(OAuth.isAuthenticated() ==false){
      console.log("not authenticated");
      $location.path("/signIn" );
    }else{
      console.log("authenticated");
      $rootScope.isAuthenticated = true;
    }
    
    $scope.createGame = function(){

      $http({
        method : 'POST',
        url: $rootScope.baseURL+'gameroom/gameroom/',
        data:{

        }
      }).then(function successCallback(response){
        console.log(response);
        $scope.data = response.data;
        $location.path('/gameroom/'+$scope.data.uuid);
      }, function errorCallback(response){
        console.log(response);
      }); 

    };

    $scope.toggleJoinRoom = function(){
      $scope.displayJoinRoom = !$scope.displayJoinRoom;
      $scope.displayActions  = !$scope.displayActions;
      
    };

    $scope.joinRoom = function () {
      $http({
        method:'POST',
        url: $rootScope.baseURL+'gameroom/join_gameroom/',
        data:{
          'room_id' : $scope.roomID 
        }
      }).then(function successCallback(response){
        console.log(response);
        $scope.data = response.data;
        $location.path('/gameroom/'+$scope.data.uuid);
      }, function errorCallback(error){
        console.log(error);
      });
    }
  });
