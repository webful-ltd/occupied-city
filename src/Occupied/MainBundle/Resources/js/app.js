'use strict';

angular.module('occupied', [
    'occupied.controllers',
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: '/partials/home.html'
            })
            .state('about', {
                url: '/about',
                controller: 'AboutController',
                templateUrl: '/partials/about.html'
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
