'use strict';

angular.module('occupied', [
    'occupied.controllers',
    'occupied.directives',
    'ui.router',
    'leaflet-directive',
    'angulartics',
    'angulartics.google.analytics'
])
    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
    }])

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
                templateUrl: '/partials/about.html',
                data: { pageTitle: 'About' }
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
