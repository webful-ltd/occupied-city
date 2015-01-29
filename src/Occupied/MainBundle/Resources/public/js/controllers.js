'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'leafletData', 'CityData', 'HistoryData', 'MapHelper', 'baseArea', function($scope, $state, $filter, leafletData, CityData, HistoryData, MapHelper, baseArea) {
        var city = CityData.getCity($state.params['city']);
        if (city === false) {
            $state.go('home');
        }

        $scope.thisYear = (new Date()).getFullYear();
        $scope.historyIndex = 0;
        var history = HistoryData.get();
        $scope.originalPopulation = history[0]['population'];
        $scope.originalArea = baseArea;

        $scope.update = function() {
            var current = history[$scope.historyIndex];
            $scope.dayHeading = $scope.thisYear + current['year'] - 1946;
            $scope.population = $scope.originalPopulation * current['populationPercentage'] / 100;
            $scope.events = current['events'];
        };

        $scope.progress = function() {
            $scope.historyIndex++;
            $scope.update();
        };

        $scope.back = function() {
            $scope.historyIndex--;
            $scope.update();
        };

        $scope.update();

        city['name'] = $state.params['city'];
        $scope.city = city;
        $state.current.data = {'pageTitle': $state.params['city']};

        // Add all the city-specific mapping pieces: centre position and circle/outline overlay
        angular.extend($scope, MapHelper.buildLeafletData(city));
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
