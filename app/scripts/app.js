/* global app:true */

'use strict';

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */

var app = angular.module('angNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
    })
    .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.constant('FIREBASE_URL', 'https://resplendent-fire-4810.firebaseio.com/');