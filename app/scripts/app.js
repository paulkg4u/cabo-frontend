'use strict';

/**
 * @ngdoc overview
 * @name caboFrontendApp
 * @description
 * # caboFrontendApp
 *
 * Main module of the application.
 */
var caboApp = angular
    .module('caboFrontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'angular-oauth2',
        'ui.bootstrap'
    ]);



caboApp.config(['OAuthProvider', 'OAuthTokenProvider', function (OAuthProvider, OAuthTokenProvider) {
    OAuthProvider.configure({
        baseUrl: 'http://localhost:8000/',
        clientId: 'CkOQ7ENKi7oIKzKTIJTxAl4ZGPfob2nJxV5YI63t',
        clientSecret: 'noKjq9SPAGWZHYgPBLhj7BDVgID6KDEHvA4s49zVdf0PXtreqtXSZ2223t624sH6fxfnB2RTvepzxABgm4JJKY1PgQmLl4GmW6xL8m6NlRMHgqaLPNIufTb6RtdFr3LP',
        grantPath: '/o/token/',
        revokePath: '/o/revoke-token/'
    });
    OAuthTokenProvider.configure({
        name: 'token',
        options: {
            secure: false
        }
    });
}]);

caboApp.run(function ($rootScope, $localStorage, ) {
    $rootScope.isAuthenticated = false;
    $rootScope.$storage = $localStorage;
    $rootScope.baseURL = "http://localhost:8000/";
    $rootScope.gameroomURL = "https://cabo-1cd87.firebaseio.com/";
    $rootScope.cards = {
        '0D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/0D.svg',
                'png': 'https://deckofcardsapi.com/static/img/0D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/0D.png',
            'code': '0D',
            'value': '10',
            'suit': 'DIAMONDS',
            'power' : 2
        },
        '3S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/3S.svg',
                'png': 'https://deckofcardsapi.com/static/img/3S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/3S.png',
            'code': '3S',
            'value': '3',
            'suit': 'SPADES'
        },
        '2C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/2C.svg',
                'png': 'https://deckofcardsapi.com/static/img/2C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/2C.png',
            'code': '2C',
            'value': '2',
            'suit': 'CLUBS'
        },
        '5S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/5S.svg',
                'png': 'https://deckofcardsapi.com/static/img/5S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/5S.png',
            'code': '5S',
            'value': '5',
            'suit': 'SPADES'
        },
        'JS': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/JS.svg',
                'png': 'https://deckofcardsapi.com/static/img/JS.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/JS.png',
            'code': 'JS',
            'value': 'JACK',
            'suit': 'SPADES',
            'power' : 3
        },
        'JD': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/JD.svg',
                'png': 'https://deckofcardsapi.com/static/img/JD.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/JD.png',
            'code': 'JD',
            'value': 'JACK',
            'suit': 'DIAMONDS',
            'power' : 3
        },
        '3H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/3H.svg',
                'png': 'https://deckofcardsapi.com/static/img/3H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/3H.png',
            'code': '3H',
            'value': '3',
            'suit': 'HEARTS'
        },
        'JH': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/JH.svg',
                'png': 'https://deckofcardsapi.com/static/img/JH.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/JH.png',
            'code': 'JH',
            'value': 'JACK',
            'suit': 'HEARTS',
            'power' : 3
        },
        '5H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/5H.svg',
                'png': 'https://deckofcardsapi.com/static/img/5H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/5H.png',
            'code': '5H',
            'value': '5',
            'suit': 'HEARTS'
        },
        '3C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/3C.svg',
                'png': 'https://deckofcardsapi.com/static/img/3C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/3C.png',
            'code': '3C',
            'value': '3',
            'suit': 'CLUBS'
        },
        '5D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/5D.svg',
                'png': 'https://deckofcardsapi.com/static/img/5D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/5D.png',
            'code': '5D',
            'value': '5',
            'suit': 'DIAMONDS'
        },
        '4D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/4D.svg',
                'png': 'https://deckofcardsapi.com/static/img/4D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/4D.png',
            'code': '4D',
            'value': '4',
            'suit': 'DIAMONDS'
        },
        '5C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/5C.svg',
                'png': 'https://deckofcardsapi.com/static/img/5C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/5C.png',
            'code': '5C',
            'value': '5',
            'suit': 'CLUBS'
        },
        '3D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/3D.svg',
                'png': 'https://deckofcardsapi.com/static/img/3D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/3D.png',
            'code': '3D',
            'value': '3',
            'suit': 'DIAMONDS'
        },
        '9H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/9H.svg',
                'png': 'https://deckofcardsapi.com/static/img/9H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/9H.png',
            'code': '9H',
            'value': '9',
            'suit': 'HEARTS',
            'power' : 2
        },
        '7D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/7D.svg',
                'png': 'https://deckofcardsapi.com/static/img/7D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/7D.png',
            'code': '7D',
            'value': '7',
            'suit': 'DIAMONDS',
            'power' : 1
        },
        '7C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/7C.svg',
                'png': 'https://deckofcardsapi.com/static/img/7C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/7C.png',
            'code': '7C',
            'value': '7',
            'suit': 'CLUBS',
            'power' : 1
        },
        '9C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/9C.svg',
                'png': 'https://deckofcardsapi.com/static/img/9C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/9C.png',
            'code': '9C',
            'value': '9',
            'suit': 'CLUBS',
            'power' : 2
        },
        '9D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/9D.svg',
                'png': 'https://deckofcardsapi.com/static/img/9D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/9D.png',
            'code': '9D',
            'value': '9',
            'suit': 'DIAMONDS',
            'power' : 2
        },
        '7H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/7H.svg',
                'png': 'https://deckofcardsapi.com/static/img/7H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/7H.png',
            'code': '7H',
            'value': '7',
            'suit': 'HEARTS',
            'power' : 1
        },
        '7S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/7S.svg',
                'png': 'https://deckofcardsapi.com/static/img/7S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/7S.png',
            'code': '7S',
            'value': '7',
            'suit': 'SPADES',
            'power' : 1
        },
        '9S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/9S.svg',
                'png': 'https://deckofcardsapi.com/static/img/9S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/9S.png',
            'code': '9S',
            'value': '9',
            'suit': 'SPADES',
            'power' : 2
        },
        'JC': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/JC.svg',
                'png': 'https://deckofcardsapi.com/static/img/JC.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/JC.png',
            'code': 'JC',
            'value': 'JACK',
            'suit': 'CLUBS',
            'power' : 3
        },
        '0S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/0S.svg',
                'png': 'https://deckofcardsapi.com/static/img/0S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/0S.png',
            'code': '0S',
            'value': '10',
            'suit': 'SPADES',
            'power' : 2
        },
        'AC': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/AC.svg',
                'png': 'https://deckofcardsapi.com/static/img/AC.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/AC.png',
            'code': 'AC',
            'value': 'ACE',
            'suit': 'CLUBS'
        },
        'AD': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/AD.svg',
                'png': 'https://deckofcardsapi.com/static/img/AD.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
            'code': 'AD',
            'value': 'ACE',
            'suit': 'DIAMONDS'
        },
        '2S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/2S.svg',
                'png': 'https://deckofcardsapi.com/static/img/2S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/2S.png',
            'code': '2S',
            'value': '2',
            'suit': 'SPADES'
        },
        'AH': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/AH.svg',
                'png': 'https://deckofcardsapi.com/static/img/AH.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/AH.png',
            'code': 'AH',
            'value': 'ACE',
            'suit': 'HEARTS'
        },
        '4S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/4S.svg',
                'png': 'https://deckofcardsapi.com/static/img/4S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/4S.png',
            'code': '4S',
            'value': '4',
            'suit': 'SPADES'
        },
        '2D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/2D.svg',
                'png': 'https://deckofcardsapi.com/static/img/2D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/2D.png',
            'code': '2D',
            'value': '2',
            'suit': 'DIAMONDS'
        },
        '0C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/0C.svg',
                'png': 'https://deckofcardsapi.com/static/img/0C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/0C.png',
            'code': '0C',
            'value': '10',
            'suit': 'CLUBS',
            'power' : 2
        },
        'AS': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/AS.svg',
                'png': 'https://deckofcardsapi.com/static/img/AS.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/AS.png',
            'code': 'AS',
            'value': 'ACE',
            'suit': 'SPADES'
        },
        '4H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/4H.svg',
                'png': 'https://deckofcardsapi.com/static/img/4H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/4H.png',
            'code': '4H',
            'value': '4',
            'suit': 'HEARTS'
        },
        'QH': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/QH.svg',
                'png': 'https://deckofcardsapi.com/static/img/QH.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/QH.png',
            'code': 'QH',
            'value': 'QUEEN',
            'suit': 'HEARTS',
            'power' : 3,
            
        },
        '8H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/8H.svg',
                'png': 'https://deckofcardsapi.com/static/img/8H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/8H.png',
            'code': '8H',
            'value': '8',
            'suit': 'HEARTS',
            'power' : 1
        },
        '0H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/0H.svg',
                'png': 'https://deckofcardsapi.com/static/img/0H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/0H.png',
            'code': '0H',
            'value': '10',
            'suit': 'HEARTS',
            'power' : 2
        },
        '2H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/2H.svg',
                'png': 'https://deckofcardsapi.com/static/img/2H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/2H.png',
            'code': '2H',
            'value': '2',
            'suit': 'HEARTS'
        },
        '4C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/4C.svg',
                'png': 'https://deckofcardsapi.com/static/img/4C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/4C.png',
            'code': '4C',
            'value': '4',
            'suit': 'CLUBS'
        },
        'KC': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/KC.svg',
                'png': 'https://deckofcardsapi.com/static/img/KC.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/KC.png',
            'code': 'KC',
            'value': 'KING',
            'suit': 'CLUBS'
        },
        'QS': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/QS.svg',
                'png': 'https://deckofcardsapi.com/static/img/QS.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/QS.png',
            'code': 'QS',
            'value': 'QUEEN',
            'suit': 'SPADES',
            'power' : 3
        },
        '6C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/6C.svg',
                'png': 'https://deckofcardsapi.com/static/img/6C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/6C.png',
            'code': '6C',
            'value': '6',
            'suit': 'CLUBS'
        },
        '6D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/6D.svg',
                'png': 'https://deckofcardsapi.com/static/img/6D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/6D.png',
            'code': '6D',
            'value': '6',
            'suit': 'DIAMONDS'
        },
        'KD': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/KD.svg',
                'png': 'https://deckofcardsapi.com/static/img/KD.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/KD.png',
            'code': 'KD',
            'value': 'KING',
            'suit': 'DIAMONDS'
        },
        '6H': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/6H.svg',
                'png': 'https://deckofcardsapi.com/static/img/6H.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/6H.png',
            'code': '6H',
            'value': '6',
            'suit': 'HEARTS'
        },
        '8C': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/8C.svg',
                'png': 'https://deckofcardsapi.com/static/img/8C.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/8C.png',
            'code': '8C',
            'value': '8',
            'suit': 'CLUBS',
            'power' : 1
        },
        'KH': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/KH.svg',
                'png': 'https://deckofcardsapi.com/static/img/KH.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/KH.png',
            'code': 'KH',
            'value': 'KING',
            'suit': 'HEARTS'
        },
        '8D': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/8D.svg',
                'png': 'https://deckofcardsapi.com/static/img/8D.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/8D.png',
            'code': '8D',
            'value': '8',
            'suit': 'DIAMONDS',
            'power' : 1
        },
        'KS': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/KS.svg',
                'png': 'https://deckofcardsapi.com/static/img/KS.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/KS.png',
            'code': 'KS',
            'value': 'KING',
            'suit': 'SPADES'
        },
        'QC': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/QC.svg',
                'png': 'https://deckofcardsapi.com/static/img/QC.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/QC.png',
            'code': 'QC',
            'value': 'QUEEN',
            'suit': 'CLUBS',
            'power' : 3
        },
        '6S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/6S.svg',
                'png': 'https://deckofcardsapi.com/static/img/6S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/6S.png',
            'code': '6S',
            'value': '6',
            'suit': 'SPADES'
        },
        'QD': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/QD.svg',
                'png': 'https://deckofcardsapi.com/static/img/QD.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/QD.png',
            'code': 'QD',
            'value': 'QUEEN',
            'suit': 'DIAMONDS',
            'power' : 3
        },
        '8S': {
            'images': {
                'svg': 'https://deckofcardsapi.com/static/img/8S.svg',
                'png': 'https://deckofcardsapi.com/static/img/8S.png'
            },
            'image': 'https://deckofcardsapi.com/static/img/8S.png',
            'code': '8S',
            'value': '8',
            'suit': 'SPADES',
            'power' : 1
        }
    };

    $rootScope.powerCards = ['7S','8S', '9S','0S', 'JS', 'QS',
                            '7C','8C', '9C','0C', 'JC', 'QC' ,
                            '7D','8D', '9D','0D', 'JD','QD',
                            '7H','8H', '9H','0H', 'JH', 'QH'];

});
caboApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/signIn', {
            templateUrl: 'views/signin.html',
            controller: 'SigninCtrl',
            controllerAs: 'signIn',
        })
        .when('/gameroom/:room_id', {
            templateUrl: 'views/gameroom.html',
            controller: 'GameroomCtrl',
            controllerAs: 'gameroom'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile'
        })
        .when('/privacy', {
            templateUrl: 'views/privacy.html',
            controller: 'PrivacyCtrl',
            controllerAs: 'privacy'
        })
        .when('/howto', {
            templateUrl: 'views/howto.html',
            controller: 'HowtoCtrl',
            controllerAs: 'howto'
        })
        .otherwise({
            redirectTo: '/'
        });
});

caboApp.factory('Facebook', ["$q", "$window", "$rootScope", function ($q, $window, $rootScope) {
    var resolve = function (errval, retval, deferred) {
        $rootScope.$apply(function () {
            if (errval) {
                deferred.reject(errval);
            } else {
                retval.connected = true;
                deferred.resolve(retval);
            }
        });
    };

    var _login = function () {
        var deferred = $q.defer();
        //first check if we already have logged in
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app
                deferred.resolve(response);
            } else {
                // the user is logged in to Facebook,
                // but has not authenticated your app
                FB.login(function (response) {
                    if (response.authResponse) {
                        resolve(null, response, deferred);
                    } else {
                        resolve(response.error, null, deferred);
                    }
                }, { scope: 'email' });
            }
        });

        return deferred.promise;
    };

    var _watchLoginChange = function () {
        var _self = this;
        FB.Event.subscribe('auth.authResponseChange', function (res) {
            if (res.status === 'connected') {
                _self.getUserInfo();
            } else {
            }
        });
    };

    return {
        login: _login,
        loginChange: _watchLoginChange,
    };


}]);
