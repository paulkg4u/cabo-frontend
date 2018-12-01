'use strict';

/**
 * @ngdoc service
 * @name caboFrontendApp.GameroomService
 * @description
 * # GameroomService
 * Service in the caboFrontendApp.
 */
angular.module('caboFrontendApp')
  .service('GameRoomService', function ($http, $rootScope, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var game_rooms = {};

    this.get_room_info = function(room_id){
      var deferred = $q.defer();
      if(game_rooms.hasOwnProperty(room_id)){
        deferred.resolve(game_rooms[room_id])
      }else{
        $http({
          method : 'GET',
          url : $rootScope.baseURL+'gameroom/gameroom',
          params:{
            'room_uuid': room_id
          }
        }).then(function successCallBack(response){
          console.log(response);
          game_rooms[response.data.room_number] = response.data;
          deferred.resolve(response.data);
        }, function errorCallBack(response){
          console.log(response);
          deferred.reject(false)
        });

      }

      return deferred.promise;
    };

    this.add_game_room_info = function(room_info){
      game_rooms[room_info.room_number] = room_info;
    };

  });
