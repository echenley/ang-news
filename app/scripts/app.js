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

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/posts.html',
            controller: 'PostsCtrl'
        })
        .when('/posts/:postId', {
            templateUrl: 'views/single.html',
            controller: 'SingleCtrl',
            resolve: {
                post: ['$route', 'Post', function ($route, Post) {
                    return Post.find($route.current.params.postId);
                }],
                comments: ['$route', 'Post', function ($route, Post) {
                    return Post.comments($route.current.params.postId);
                }]
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.resolveUser();
                }]
            }
        })
        .when('/users/:userId', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                profile: ['$route', 'Profile', function ($route, Profile) {
                    return Profile.get($route.current.params.userId);
                }],
                posts: ['$route', 'Profile', function ($route, Profile) {
                    return Profile.getPosts($route.current.params.userId);
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }]);

app.constant('FIREBASE_URL', 'https://resplendent-fire-4810.firebaseio.com/');