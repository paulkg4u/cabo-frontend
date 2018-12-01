'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('MainCtrl', function (OAuth, $location, $rootScope, $http, $scope) {
    $scope.displayActions = true;
    $scope.displayJoinRoom = false;
    $scope.roomID = "";
    console.log(OAuth.isAuthenticated());
    if(OAuth.isAuthenticated() ==false){
      $location.path("/signIn" );
    }else{
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
        $scope.data = response.data;
        $location.path('/gameroom/'+$scope.data.uuid);
      }, function errorCallback(error){
        console.log(error);
      });
    }
  });
