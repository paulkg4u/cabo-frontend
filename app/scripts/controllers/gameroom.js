'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:GameroomCtrl
 * @description
 * # GameroomCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('GameroomCtrl', function ($scope, $rootScope, $routeParams, GameRoomService, PlayerProfileService, $http, $uibModal, $timeout) {
    $scope.player = null;
    $scope.gameStatus = "";
    $scope.isOwner = false;
    $scope.showPopedCard = false;
    $scope.applying_board = false;
    PlayerProfileService.getPlayerProfile().then(function successCallBack(response) {
      $scope.player = response;
      if ($scope.player) {
        $scope.initialiseGameBoard();
      }
    }, function errorCallBack(error) {
      console.log("could not fetch profile")
    })

    $scope.initialiseGameBoard = function () {
      $scope.game_room_id = $routeParams.room_id;
      $scope.popedCard = null;
      GameRoomService.get_room_info($scope.game_room_id).then(function successCallBack(response) {
        $scope.gameRoomData = response;
        $scope.firebase = firebase.database().ref('gamerooms').child($scope.gameRoomData.node_url);
        $scope.firebase.on('value', function (snapshot) {
          if ($scope.applying_board == false) {
            $scope.applying_board = true;
            $scope.refreshBoard(snapshot.val());
          }

        });
      }, function errorCallBack(error) {
        console.log(error);
      });
    }

    $scope.refreshBoard = function (board_data) {
      
      $scope.playerCards = board_data.player_status[$scope.player.uuid].cards;
      $scope.playerInfo = board_data.player_info;
      $scope.playerStatus = board_data.player_status;
      $scope.cardsOnDeck = board_data.cards_on_deck;
      $scope.gameStatus = board_data.game_status;
      if($scope.gameStatus == 'cabo_called' && $scope.playerStatus.last_chance){
        $scope.findWinner();
      }else{
        $scope.playedCards = board_data.played_cards;
      $scope.playerOrder = board_data.player_order;
      if ($scope.playedCards[$scope.playedCards.length - 1] != 'XX') {
        $scope.lastPlayedCard = $rootScope.cards[$scope.playedCards[$scope.playedCards.length - 1]];
      }
      $scope.myStatus = $scope.playerStatus[$scope.player.uuid];
      delete ($scope.playerStatus[$scope.player.uuid]);
      delete ($scope.playerInfo[$scope.player.uuid]);
      $scope.otherPlayers = $scope.playerInfo;
      $scope.currentPlayer = board_data.current_player;
      if ($scope.gameRoomData.owner == $scope.player.uuid) {
        $scope.isOwner = true;
      } else {
        $scope.isOwner = false;
      }
      $scope.applying_board = false;
      
      if($scope.currentPlayer == $scope.player.uuid){
        $scope.myChance = true;
      }
      $rootScope.$apply();
      }
      
    }

    $scope.findWinner = function(){
      $http({
        method: 'POST',
        url: $rootScope.baseURL + 'gameroom/find_winner/',
        data: {
          'room_id': $scope.gameRoomData.room_number
        }
      }).then(function successCallBack(response) {
        console.log(response);
      }, function errorCallBack(response) {
        console.log(response)
      });
    };

    
    $scope.popCard = function () {
      if ($scope.currentPlayer == $scope.player.uuid) {
        if($scope.popedCard == null) {
          $scope.popedCard = $rootScope.cards[$scope.cardsOnDeck.pop()];
          $scope.showPopedCard = true;
          console.log($rootScope.cards[$scope.popedCard]);
          if ($rootScope.powerCards.indexOf($scope.popedCard.code) > -1) {
            $scope.isPowerCard = true;
          } else {
            $scope.isPowerCard = false;
          }

          console.log($scope.firebase);
          console.log($scope.cardsOnDeck);
          $scope.firebase.update({ 'cards_on_deck': $scope.cardsOnDeck });
        } else {
          $scope.showPopedCard = false;
          $scope.popedCard = null;
        }
      }else{
        console.log("not your chance");
      }

    };

    $scope.cardActions = {
      'swap': function () {
        $scope.enableSelectingCard = true;
        $scope.actionOnSelect = 'swap';
      },
      'throw': function () {
        $scope.playedCards.push($scope.popedCard.code);
        $scope.lastPlayedCard = $scope.popedCard;
        $scope.updates = { 'played_cards': $scope.playedCards }
        $scope.runCallCaboTimer($scope.findNextPlayer());
        $scope.firebase.update($scope.updates);
        $scope.popedCard = null;
        $scope.showPopedCard = false;
      },
      'usePower': function () {
        $scope.playedCards.push($scope.popedCard.code);
        $scope.lastPlayedCard = $scope.popedCard;
        $scope.firebase.update({ 'played_cards': $scope.playedCards });
        // send message for power card
        if ($scope.popedCard.power == 1) {
          $scope.enableSelectingCard = true;
          $scope.actionOnSelect = 'see_mine';
        } else if ($scope.popedCard.power == 2) {
          $scope.actionOnSelect = 'see_others';
          // find the player for see next
          $scope.enableSelectingCard = true;
          $scope.targetPlayer = $scope.findNextPlayer();
        } else {
          $scope.actionOnSelect = 'add_for_exchange';
          $scope.targetPlayer = $scope.findNextPlayer();
          $scope.cards_to_swap = [];
          $scope.positions_to_swap = [];
          // find the player coming next
        }
        $scope.popedCard = null;
        $scope.showPopedCard = false;
      }
    }

    $scope.findNextPlayer = function () { 
      $scope.currentPlayerIndex = $scope.playerOrder.indexOf($scope.player.uuid);
      if($scope.currentPlayerIndex == $scope.playerOrder.length -1){
        return $scope.playerOrder[0];
      }else{
        return $scope.playerOrder[$scope.currentPlayerIndex+1];
      }
    }

    $scope.selectCard = function (selectedCard, cardPosition = null) {
      $scope.enableSelectingCard = false;
      if ($scope.actionOnSelect == 'swap') {
        $scope.playedCards.push(selectedCard);
        $scope.updates = { 'played_cards': $scope.playedCards };
        $scope.updates['player_status/' + $scope.player.uuid + '/cards'] = $scope.playerCards;
        $scope.runCallCaboTimer($scope.findNextPlayer());
        $scope.playerCards[cardPosition] = $scope.popedCard.code;
        console.log($scope.updates);

        $scope.firebase.update($scope.updates);
        $scope.popedCard = null;
        $scope.showPopedCard = false;
      } else if ($scope.actionOnSelect == 'see_mine') {
        var cardModal = $uibModal.open({
          animation: true,
          templateUrl: '/views/components/showCardModal.html',
          controller: 'showCardModalCtrl',
          size: 'sm',
          resolve: {
            selectedCard: function () {
              return selectedCard;
            }
          }
        });
        $scope.runCallCaboTimer($scope.findNextPlayer());
      } else if ($scope.actionOnSelect == 'see_others') {
        var cardModal = $uibModal.open({
          animation: true,
          templateUrl: '/views/components/showCardModal.html',
          controller: 'showCardModalCtrl',
          size: 'sm',
          resolve: {
            selectedCard: function () {
              return selectedCard;
            }
          }
        });
        $scope.runCallCaboTimer($scope.targetPlayer);
        $scope.targetPlayer = null;
      }else if ($scope.actionOnSelect == 'add_for_exchange'){
        if($scope.cards_to_swap.length == 0){
          $scope.cards_to_swap.push(selectedCard);
          $scope.positions_to_swap.push(cardPosition);
        }else if($scope.cards_to_swap.length == 1){
          $scope.cards_to_swap.push(selectedCard);
          $scope.positions_to_swap.push(cardPosition);
          console.log($scope.cards_to_swap);
          $scope.playerCards[$scope.positions_to_swap[0]] = $scope.cards_to_swap[1];
          $scope.playerStatus[$scope.targetPlayer].cards[$scope.positions_to_swap[1]] = $scope.cards_to_swap[0];
          $scope.updates = {};
          $scope.updates['player_status/' + $scope.player.uuid + '/cards'] = $scope.playerCards;
          $scope.updates['player_status/' + $scope.targetPlayer + '/cards'] =  $scope.playerStatus[$scope.targetPlayer].cards;
          $scope.runCallCaboTimer($scope.targetPlayer);
          $scope.firebase.update($scope.updates);

        }
      }
    };

    $scope.useCard = function (actionName) {
      if (actionName.length) {
        $scope.cardActions[actionName]();
      }
    };


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

    $scope.callCabo = function(){
      $scope.callCaboTimerRunnning = false;
      $scope.updates  = {'game_status' : 'cabo_called'};
      $scope.updates['player_status/' + $scope.player.uuid + '/last_chance'] = true;
      $scope.firebase.update($scope.updates);
    };

    $scope.skipCallCabo = function(){
      $scope.callCaboTimerRunnning = false;
      $scope.updateCurrentPlayer(nextPlayer);
    };

    $scope.updateCurrentPlayer = function(player_uuid){
      $scope.updates = {'current_player':player_uuid};
      $scope.firebase.update($scope.updates);
    };

    $scope.runCallCaboTimer = function(nextPlayer){
      $scope.nextPlayer = nextPlayer;
      $scope.callCaboTimerRunnning = true;
      $timeout(function(){
        if($scope.callCaboTimerRunnning){
          $scope.callCaboTimerRunnning = false;
          $scope.updateCurrentPlayer(nextPlayer);
        }
      }, 5000);
    }
  });


  angular.module('caboFrontendApp').controller('showCardModalCtrl', function($rootScope, $uibModalInstance, selectedCard, $scope){
    $scope.card = selectedCard;
    $scope.popUpCard = $rootScope.cards[$scope.card];
    console.log("inside uib modal instance");
    console.log($scope.card);
    $scope.close = function(){
      $uibModalInstance.close();
    }
  });
