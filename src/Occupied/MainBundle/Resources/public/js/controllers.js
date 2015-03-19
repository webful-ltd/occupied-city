'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'leafletData', 'CityData', 'HistoryData', 'MapHelper', 'baseArea', function($scope, $state, $filter, leafletData, CityData, HistoryData, MapHelper, baseArea) {
        var city = CityData.getCity($state.params['city']);
        if (city === false) {
            $state.go('home');
            return;
        }

        // If the case was wrong, redirect so we have consistent URLs for sharing
        if (city.name !== $state.params['city']) {
            $state.go('city', {city: city.name});
            return;
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

        $scope.city = city;
        $state.current.data = {'pageTitle': $state.params['city']};

        // Add all the city-specific mapping pieces: centre position and circle/outline overlay
        angular.extend($scope, MapHelper.buildLeafletData(city));

        // TODO use leaflet-pip
        //
        //leafletPip.bassackwards = true;
        //leafletData.getGeoJSON().then(function(l2) {
        //    console.log(l2);
        //    console.log(leafletPip.pointInLayer([53.47, -2.23], l2, true));
        //});
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
