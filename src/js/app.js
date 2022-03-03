'use strict';

require('angular');
require('angular-aria');
require('angular-leaflet-directive');
require('angular-ui-router')
require('angulartics');
require('angulartics-google-analytics');
require('leaflet');
require('leaflet/dist/leaflet.css');
require('leaflet.awesome-markers');
require('leaflet-pip');

require('../css/main.css')
require('leaflet.awesome-markers/dist/leaflet.awesome-markers.css')

require('./controllers')
require('./directives')
require('./filters')
require('./services')

angular.module('occupied', [
    'occupied.controllers',
    'occupied.directives',
    'occupied.filters',
    'occupied.services',
    'ngAria',
    'ui.router',
    'leaflet-directive',
    'angulartics',
    'angulartics.google.analytics'
])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: '/partials/home.html'
            })
            .state('contact', {
                url: '/contact',
                controller: 'ContactController',
                templateUrl: '/partials/contact.html',
                data: { pageTitle: 'Contact Us' }
            })
            .state('about', {
                url: '/about',
                controller: 'AboutController',
                templateUrl: '/partials/about.html',
                data: { pageTitle: 'About' }
            })
            .state('city', {
                url: '/:city',
                controller: 'CityController',
                templateUrl: '/partials/city.html'
            })
            .state('city.year', {   // child of `city`
                url: '/:year',      // this URL piece follows `city`'s
                controller: 'CityController',
                templateUrl: '/partials/city.html'
            })
        ;

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
