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
        'angular-oauth2'
    ]);



caboApp.config(['OAuthProvider','OAuthTokenProvider', function (OAuthProvider, OAuthTokenProvider) {
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

caboApp.run(function ($rootScope, $localStorage,) {
    $rootScope.$storage = $localStorage;
    $rootScope.baseURL = "http://localhost:8000/";
    $rootScope.gameroomURL = "https://cabo-1cd87.firebaseio.com/";
    $rootScope.cards = [
        {
            "suit": "CLUBS",
            "value": "3",
            "code": "3C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/3C.svg",
                "png": "https://deckofcardsapi.com/static/img/3C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/3C.png"
        },
        {
            "suit": "SPADES",
            "value": "JACK",
            "code": "JS",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/JS.svg",
                "png": "https://deckofcardsapi.com/static/img/JS.png"
            },
            "image": "https://deckofcardsapi.com/static/img/JS.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "3",
            "code": "3D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/3D.svg",
                "png": "https://deckofcardsapi.com/static/img/3D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/3D.png"
        },
        {
            "suit": "CLUBS",
            "value": "7",
            "code": "7C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/7C.svg",
                "png": "https://deckofcardsapi.com/static/img/7C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/7C.png"
        },
        {
            "suit": "HEARTS",
            "value": "JACK",
            "code": "JH",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/JH.svg",
                "png": "https://deckofcardsapi.com/static/img/JH.png"
            },
            "image": "https://deckofcardsapi.com/static/img/JH.png"
        },
        {
            "suit": "SPADES",
            "value": "3",
            "code": "3S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/3S.svg",
                "png": "https://deckofcardsapi.com/static/img/3S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/3S.png"
        },
        {
            "suit": "SPADES",
            "value": "5",
            "code": "5S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5S.svg",
                "png": "https://deckofcardsapi.com/static/img/5S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/5S.png"
        },
        {
            "suit": "SPADES",
            "value": "ACE",
            "code": "AS",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/AS.svg",
                "png": "https://deckofcardsapi.com/static/img/AS.png"
            },
            "image": "https://deckofcardsapi.com/static/img/AS.png"
        },
        {
            "suit": "SPADES",
            "value": "4",
            "code": "4S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/4S.svg",
                "png": "https://deckofcardsapi.com/static/img/4S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/4S.png"
        },
        {
            "suit": "CLUBS",
            "value": "6",
            "code": "6C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6C.svg",
                "png": "https://deckofcardsapi.com/static/img/6C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/6C.png"
        },
        {
            "suit": "HEARTS",
            "value": "4",
            "code": "4H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/4H.svg",
                "png": "https://deckofcardsapi.com/static/img/4H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/4H.png"
        },
        {
            "suit": "CLUBS",
            "value": "ACE",
            "code": "AC",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/AC.svg",
                "png": "https://deckofcardsapi.com/static/img/AC.png"
            },
            "image": "https://deckofcardsapi.com/static/img/AC.png"
        },
        {
            "suit": "SPADES",
            "value": "QUEEN",
            "code": "QS",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QS.svg",
                "png": "https://deckofcardsapi.com/static/img/QS.png"
            },
            "image": "https://deckofcardsapi.com/static/img/QS.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "2",
            "code": "2D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/2D.svg",
                "png": "https://deckofcardsapi.com/static/img/2D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/2D.png"
        },
        {
            "suit": "HEARTS",
            "value": "QUEEN",
            "code": "QH",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QH.svg",
                "png": "https://deckofcardsapi.com/static/img/QH.png"
            },
            "image": "https://deckofcardsapi.com/static/img/QH.png"
        },
        {
            "suit": "SPADES",
            "value": "10",
            "code": "0S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/0S.svg",
                "png": "https://deckofcardsapi.com/static/img/0S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/0S.png"
        },
        {
            "suit": "HEARTS",
            "value": "10",
            "code": "0H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/0H.svg",
                "png": "https://deckofcardsapi.com/static/img/0H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/0H.png"
        },
        {
            "suit": "CLUBS",
            "value": "10",
            "code": "0C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/0C.svg",
                "png": "https://deckofcardsapi.com/static/img/0C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/0C.png"
        },
        {
            "suit": "SPADES",
            "value": "8",
            "code": "8S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/8S.svg",
                "png": "https://deckofcardsapi.com/static/img/8S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/8S.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "KING",
            "code": "KD",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/KD.svg",
                "png": "https://deckofcardsapi.com/static/img/KD.png"
            },
            "image": "https://deckofcardsapi.com/static/img/KD.png"
        },
        {
            "suit": "SPADES",
            "value": "2",
            "code": "2S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/2S.svg",
                "png": "https://deckofcardsapi.com/static/img/2S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/2S.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "ACE",
            "code": "AD",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/AD.svg",
                "png": "https://deckofcardsapi.com/static/img/AD.png"
            },
            "image": "https://deckofcardsapi.com/static/img/aceDiamonds.png"
        },
        {
            "suit": "CLUBS",
            "value": "KING",
            "code": "KC",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/KC.svg",
                "png": "https://deckofcardsapi.com/static/img/KC.png"
            },
            "image": "https://deckofcardsapi.com/static/img/KC.png"
        },
        {
            "suit": "HEARTS",
            "value": "2",
            "code": "2H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/2H.svg",
                "png": "https://deckofcardsapi.com/static/img/2H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/2H.png"
        },
        {
            "suit": "CLUBS",
            "value": "2",
            "code": "2C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/2C.svg",
                "png": "https://deckofcardsapi.com/static/img/2C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/2C.png"
        },
        {
            "suit": "CLUBS",
            "value": "QUEEN",
            "code": "QC",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QC.svg",
                "png": "https://deckofcardsapi.com/static/img/QC.png"
            },
            "image": "https://deckofcardsapi.com/static/img/QC.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "9",
            "code": "9D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9D.svg",
                "png": "https://deckofcardsapi.com/static/img/9D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/9D.png"
        },
        {
            "suit": "SPADES",
            "value": "6",
            "code": "6S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6S.svg",
                "png": "https://deckofcardsapi.com/static/img/6S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/6S.png"
        },
        {
            "suit": "HEARTS",
            "value": "ACE",
            "code": "AH",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/AH.svg",
                "png": "https://deckofcardsapi.com/static/img/AH.png"
            },
            "image": "https://deckofcardsapi.com/static/img/AH.png"
        },
        {
            "suit": "CLUBS",
            "value": "5",
            "code": "5C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5C.svg",
                "png": "https://deckofcardsapi.com/static/img/5C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/5C.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "4",
            "code": "4D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/4D.svg",
                "png": "https://deckofcardsapi.com/static/img/4D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/4D.png"
        },
        {
            "suit": "SPADES",
            "value": "KING",
            "code": "KS",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/KS.svg",
                "png": "https://deckofcardsapi.com/static/img/KS.png"
            },
            "image": "https://deckofcardsapi.com/static/img/KS.png"
        },
        {
            "suit": "CLUBS",
            "value": "9",
            "code": "9C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9C.svg",
                "png": "https://deckofcardsapi.com/static/img/9C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/9C.png"
        },
        {
            "suit": "HEARTS",
            "value": "9",
            "code": "9H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9H.svg",
                "png": "https://deckofcardsapi.com/static/img/9H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/9H.png"
        },
        {
            "suit": "HEARTS",
            "value": "3",
            "code": "3H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/3H.svg",
                "png": "https://deckofcardsapi.com/static/img/3H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/3H.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "10",
            "code": "0D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/0D.svg",
                "png": "https://deckofcardsapi.com/static/img/0D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/0D.png"
        },
        {
            "suit": "SPADES",
            "value": "9",
            "code": "9S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/9S.svg",
                "png": "https://deckofcardsapi.com/static/img/9S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/9S.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "JACK",
            "code": "JD",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/JD.svg",
                "png": "https://deckofcardsapi.com/static/img/JD.png"
            },
            "image": "https://deckofcardsapi.com/static/img/JD.png"
        },
        {
            "suit": "HEARTS",
            "value": "KING",
            "code": "KH",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/KH.svg",
                "png": "https://deckofcardsapi.com/static/img/KH.png"
            },
            "image": "https://deckofcardsapi.com/static/img/KH.png"
        },
        {
            "suit": "CLUBS",
            "value": "8",
            "code": "8C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/8C.svg",
                "png": "https://deckofcardsapi.com/static/img/8C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/8C.png"
        },
        {
            "suit": "HEARTS",
            "value": "7",
            "code": "7H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/7H.svg",
                "png": "https://deckofcardsapi.com/static/img/7H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/7H.png"
        },
        {
            "suit": "HEARTS",
            "value": "6",
            "code": "6H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6H.svg",
                "png": "https://deckofcardsapi.com/static/img/6H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/6H.png"
        },
        {
            "suit": "CLUBS",
            "value": "4",
            "code": "4C",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/4C.svg",
                "png": "https://deckofcardsapi.com/static/img/4C.png"
            },
            "image": "https://deckofcardsapi.com/static/img/4C.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "7",
            "code": "7D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/7D.svg",
                "png": "https://deckofcardsapi.com/static/img/7D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/7D.png"
        },
        {
            "suit": "HEARTS",
            "value": "5",
            "code": "5H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5H.svg",
                "png": "https://deckofcardsapi.com/static/img/5H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/5H.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "QUEEN",
            "code": "QD",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QD.svg",
                "png": "https://deckofcardsapi.com/static/img/QD.png"
            },
            "image": "https://deckofcardsapi.com/static/img/QD.png"
        },
        {
            "suit": "HEARTS",
            "value": "8",
            "code": "8H",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/8H.svg",
                "png": "https://deckofcardsapi.com/static/img/8H.png"
            },
            "image": "https://deckofcardsapi.com/static/img/8H.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "8",
            "code": "8D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/8D.svg",
                "png": "https://deckofcardsapi.com/static/img/8D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/8D.png"
        },
        {
            "suit": "CLUBS",
            "value": "JACK",
            "code": "JC",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/JC.svg",
                "png": "https://deckofcardsapi.com/static/img/JC.png"
            },
            "image": "https://deckofcardsapi.com/static/img/JC.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "5",
            "code": "5D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5D.svg",
                "png": "https://deckofcardsapi.com/static/img/5D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/5D.png"
        },
        {
            "suit": "SPADES",
            "value": "7",
            "code": "7S",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/7S.svg",
                "png": "https://deckofcardsapi.com/static/img/7S.png"
            },
            "image": "https://deckofcardsapi.com/static/img/7S.png"
        },
        {
            "suit": "DIAMONDS",
            "value": "6",
            "code": "6D",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6D.svg",
                "png": "https://deckofcardsapi.com/static/img/6D.png"
            },
            "image": "https://deckofcardsapi.com/static/img/6D.png"
        }
    ];


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
                },{ scope: 'email' });
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
