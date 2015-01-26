'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', function($scope) {
        $scope.home = 'Home page!';
    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.page = 'About page!';
    }])

;
