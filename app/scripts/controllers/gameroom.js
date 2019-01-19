'use strict';

/**
 * @ngdoc function
 * @name caboFrontendApp.controller:GameroomCtrl
 * @description
 * # GameroomCtrl
 * Controller of the caboFrontendApp
 */
angular.module('caboFrontendApp')
  .controller('GameroomCtrl', function ($scope, $rootScope, $routeParams, GameRoomService, PlayerProfileService, $http, $uibModal, $timeout, $location) {
    $scope.player = null;
    $scope.gameStatus = "";
    $scope.isOwner = false;
    $scope.showPopedCard = false;
    $scope.applying_board = false;
    $scope.showFirstCards = false;
    $scope.myChance = false;
    $scope.gameStatusDict = {
      'waiting_for_ready':"View Initial Cards",
      'game_started' :  "Game Started",
      'not_started' : "Waiting For Players",
      'cabo_called' : "Cabo Called",
      'your_chance' : "Your Status",
      'completed' : 'Game Over'
    };
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

      });
    }

    $scope.refreshBoard = function (board_data) {
      
      $scope.playerCards = board_data.player_status[$scope.player.uuid].cards;
      $scope.playerInfo = board_data.player_info;
      $scope.playerList = angular.copy($scope.playerInfo);
      $scope.playerStatus = board_data.player_status;
      $scope.cardsOnDeck = board_data.cards_on_deck;
      $scope.currentPlayer = board_data.current_player;
      $scope.gameStatus = board_data.game_status;

      if(($scope.cardsOnDeck == undefined || $scope.cardsOnDeck.length == 0) && $scope.gameStatus == 'game__started'){
        console.log("finding winner");
        $scope.findWinner();
      }
      if($scope.gameStatus == 'completed'){
        console.log("game completed");
        var scoreCardModal = $uibModal.open({
          animation : true,
          templateUrl: '/views/components/scoreCardModal.html',
            controller: 'scoreCardModalCtrl',
            size: 'score',
            resolve: {
              playerInfo: function () {
                return $scope.playerInfo;
              }
            }
        });

        scoreCardModal.result.then(function(){
          $location.path("/");
        }, function(){
          $location.path("/");
        });
      }else if($scope.gameStatus == 'cabo_called' && $scope.playerStatus[$scope.player.uuid].last_chance && $scope.currentPlayer == $scope.player.uuid){
        console.log("finding winner");
        $scope.findWinner();
      }else{
        $scope.playedCards = board_data.played_cards;
        $scope.playerOrder = board_data.player_order;
        
        if ($scope.playedCards[$scope.playedCards.length - 1] != 'XX') {
          $scope.lastPlayedCard = $rootScope.cards[$scope.playedCards[$scope.playedCards.length - 1]];
        }
        $scope.myStatus = $scope.playerStatus[$scope.player.uuid];
        if($scope.myStatus.initial_cards_viewed <2){
          $scope.viewFirstCards = true;
        }else{
          $scope.viewFirstCards = false;
        }
        delete ($scope.playerStatus[$scope.player.uuid]);
        delete ($scope.playerInfo[$scope.player.uuid]);
        $scope.otherPlayers = $scope.playerInfo;
        if($scope.currentPlayer){
          $scope.currentPlayerInfo = $scope.playerList[$scope.currentPlayer].user;
        }
        if ($scope.gameRoomData.owner == $scope.player.uuid) {
          $scope.isOwner = true;
        } else {
          $scope.isOwner = false;
        }
        $scope.applying_board = false;
        if($scope.currentPlayer == $scope.player.uuid && $scope.gameStatus == 'game_started' || $scope.gameStatus == 'cabo_called'){
          $scope.myChance = true;
        }
        $scope.$apply();
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
      if ($scope.currentPlayer == $scope.player.uuid && $scope.myChance) {
        if($scope.popedCard == null) {
          $scope.popedCard = $rootScope.cards[$scope.cardsOnDeck.pop()];
          $scope.showPopedCard = true;
          console.log($rootScope.cards[$scope.popedCard]);
          if ($rootScope.powerCards.indexOf($scope.popedCard.code) > -1) {
            $scope.isPowerCard = true;
          } else {
            $scope.isPowerCard = false;
          }
          $scope.firebase.update({ 'cards_on_deck': $scope.cardsOnDeck });
        } else {
          // $scope.showPopedCard = false;
        }
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

      if($scope.viewFirstCards == true){
        console.log("viewing initial cards")
        $scope.myStatus.initial_cards_viewed+=1;
        var cardModal = $uibModal.open({
          animation : true,
          templateUrl: '/views/components/showCardModal.html',
            controller: 'showCardModalCtrl',
            size: 'sm',
            resolve: {
              selectedCard: function () {
                return selectedCard;
              }
            }
        });
        $scope.updates = {};
        $scope.updates['player_status/' + $scope.player.uuid + '/initial_cards_viewed'] = $scope.myStatus.initial_cards_viewed;
        console.log($scope.myStatus)
        if($scope.myStatus.initial_cards_viewed == 2){
          $scope.viewFirstCards = false;
          
          console.log($scope.playerStatus);
          if($scope.gameStatus == 'waiting_for_ready'){
            var update_flag = true;
            for(var each_uuid in $scope.playerStatus){
              if($scope.playerStatus[each_uuid].initial_cards_viewed < 2){
                console.log("is false");
                update_flag = false;
              }
            }
            console.log($scope.update_flag);
            if(update_flag){
              console.log("updating flag");
              $scope.updates['game_status'] = 'game_started';
              $scope.firebase.update($scope.updates);
            }
          }
        }
        $scope.firebase.update($scope.updates);
      }else{
        if ($scope.actionOnSelect == 'swap') {
          $scope.playedCards.push(selectedCard);
          $scope.updates = { 'played_cards': $scope.playedCards };
          $scope.updates['player_status/' + $scope.player.uuid + '/cards'] = $scope.playerCards;
          $scope.runCallCaboTimer($scope.findNextPlayer());
          $scope.playerCards[cardPosition] = $scope.popedCard.code;
          
  
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
          $scope.runCallCaboTimer($scope.targetPlayer);
          $scope.targetPlayer = null;
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
      $scope.updates['current_player'] = $scope.findNextPlayer();
      $scope.updates['player_status/' + $scope.player.uuid + '/last_chance'] = true;
      console.log($scope.updates);
      $scope.firebase.update($scope.updates);
    };

    $scope.skipCallCabo = function(){
      $scope.callCaboTimerRunnning = false;
      $scope.updateCurrentPlayer($scope.findNextPlayer());
    };

    $scope.updateCurrentPlayer = function(player_uuid){
      $scope.updates = {'current_player':player_uuid};
      if($scope.gameStatus == 'cabo_called' && $scope.myStatus.last_chance == false){
        $scope.updates['player_status/' + $scope.player.uuid + '/last_chance'] = true;
      }
      $scope.firebase.update($scope.updates);
    };

    $scope.runCallCaboTimer = function(nextPlayer){
      $scope.nextPlayer = nextPlayer;
      $scope.callCaboTimerRunnning = true;
      if($scope.gameStatus == 'cabo_called'){
        $scope.callCaboTimerRunnning = false;
            $scope.updateCurrentPlayer(nextPlayer);
      }else{
        $timeout(function(){
          if($scope.callCaboTimerRunnning){
            $scope.callCaboTimerRunnning = false;
            $scope.updateCurrentPlayer(nextPlayer);
          }
        }, 5000);
      }
      
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
