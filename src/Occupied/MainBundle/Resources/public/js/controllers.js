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

        var history = HistoryData.get();
        var thisYear = (new Date()).getFullYear();
        var firstYear = history[0]['year'];
        var offset = thisYear - firstYear;

        if (!$state.params['year']) {
            $scope.activeYear = firstYear;
        } else {
            $scope.activeYear = $state.params['year'];
        }

        var historyIndex = 0;
        for (var ii = 0; ii < history.length; ii++) {
            if (history[ii].year == $scope.activeYear) {
                historyIndex = ii;
                break;
            }
        }

        // If the case was wrong, redirect so we have consistent URLs for sharing
        if (city.name !== $state.params['city']) {
            $state.go('city', {city: city.name});
            return;
        }

        var current = history[historyIndex];
        var originalPopulation = history[0]['population'];
        var populationRatio = city.population / originalPopulation;
        $scope.canGoForward = (historyIndex < history.length - 1);
        $scope.canGoBack = (historyIndex > 0);

        $scope.progress = function() {
            $state.go('city.year', {city: city.name, year: history[historyIndex + 1].year}, {reload: true});
        };

        $scope.back = function() {
            $state.go('city.year', {city: city.name, year: history[historyIndex - 1].year}, {reload: true});
        };

        $scope.dayHeading = parseInt($scope.activeYear) + offset;
        $scope.population = originalPopulation * populationRatio;
        $scope.events = current['events'];
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
