'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'leafletData', function($scope, leafletData) {
        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            }
        });

    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.page = 'About page!';
    }])

;
