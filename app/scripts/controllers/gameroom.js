'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:GameroomCtrl
 * @description
 * # GameroomCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('GameroomCtrl', function ($scope, $rootScope, $routeParams, GameRoomService, PlayerProfileService, $http) {
    $scope.player = null;
    PlayerProfileService.getPlayerProfile().then(function successCallBack(response) {
      $scope.player = response
    }, function errorCallBack(error) {
      console.log("could not fetch profile")
    })
    $scope.$watch(function () {
      return $scope.player;
    }, function () {
      if ($scope.player) {
        $scope.initialiseGameBoard();
      }
    }, true);

    $scope.initialiseGameBoard = function () {
      $scope.game_room_id = $routeParams.room_id;
      $scope.otherPlayers = [1, 2, 3];
      $scope.playerCards = [1, 2, 3, 4];
      GameRoomService.get_room_info($scope.game_room_id).then(function successCallBack(response) {
        console.log(response);
        $scope.gameRoomData = response;
        console.log($scope.gameRoomData.node_url);
        $scope.firebase = firebase.database().ref('gamerooms').child($scope.gameRoomData.node_url);
        $scope.firebase.on('value', function (snapshot) {
          console.log(snapshot.val())
          $scope.playerCards = snapshot.val().player_status[$scope.player.uuid].cards;
          $scope.otherPlayers = snapshot.val().player_info;
          $scope.cards_on_deck = snapshot.val().cards_on_deck;

          console.log($scope.playerCards);
        });
      }, function errorCallBack(error) {
        console.log(error);
      });
    }




    $scope.startGame = function () {
      $http({
        method: 'POST',
        url: $rootScope.baseURL + 'gameroom/start_game/',
        data: {
          'room_id': $scope.gameRoomData.room_number
        }
      }).then(function successCallBack(response) {
        console.log(response);
      }, function errorCallBack(response) {
        console.log(response)
      });
    };


  });
