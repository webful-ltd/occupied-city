'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        var places = CityData.getPlaces();
        $scope.cities = places['cities'];
        $scope.countries = places['countries'];
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'CityData', 'HistoryData', 'MapHelper', function($scope, $state, $filter, CityData, HistoryData, MapHelper) {
        var city = CityData.getCity($state.params['city']);
        if (city === false) {
            $state.go('home');
            return;
        }

        $scope.thisYear = (new Date()).getFullYear();

        var history = HistoryData.get();
        var firstYear = history[0]['year'];
        var offset = $scope.thisYear - firstYear;

        if (!$state.params['year']) {
            $scope.activeYear = firstYear;
        } else {
            $scope.activeYear = $state.params['year'];
        }

        // If the case was wrong, redirect so we have consistent URLs for sharing
        if (city.name !== $state.params['city']) {
            if (!$state.params['year']) {
                $state.go('city', {city: city.name});
            } else {
                $state.go('city.year', {city: city.name, year: $state.params['year']});
            }
        }

        $scope.historyIndex = 0;

        $scope.updateFigures = function() {
            for (var ii = 0; ii < history.length; ii++) {
                if (history[ii].year == $scope.activeYear) {
                    $scope.historyIndex = ii;
                    break;
                }
            }

            // If an invalid year's specified, jump to the start for this city
            if (!!$state.params['year'] && $scope.historyIndex === 0 && $state.params['year'] != firstYear) {
                $state.go('city', {city: city.name}, {reload: true});
            }

            var current = history[$scope.historyIndex];

            $scope.dayHeading = parseInt($scope.activeYear) + offset;
            $scope.refugees = 0;
            $scope.settlers = 0;
            $scope.settlements = 0;
            $scope.settlerArea = 0;

            $scope.population = parseInt(current.population * populationRatio);
            if ('refugees' in current) {
                $scope.refugees = parseInt(current.refugees * populationRatio);
            }
            if ('settlers' in current) {
                $scope.settlers = parseInt(current.settlers * populationRatio);
            }
            if ('settlements' in current) {
                $scope.settlements = parseInt(current.settlements);
            }
            if ('settlerControlledArea' in current) {
                var originalArea = history[0]['area'];
                var areaRatio = city.area / originalArea;
                $scope.settlerArea = parseInt(current.settlerControlledArea * areaRatio);
            }

            $scope.events = current['events'];
            $scope.canGoForward = ($scope.historyIndex < history.length - 1);
            $scope.canGoBack = ($scope.historyIndex > 0);

            var mapColour = ($scope.refugees > 0 ? '#f99' : '#9f9');
            var existingColour = ('circle' in $scope.paths) ? $scope.paths.circle.color : $scope.geojson.style.fillColor;

            if (mapColour !== existingColour) {
                // Because we currently only change colour at points where there are no markers, we can afford to do a
                // full map redraw in these cases without breaking the settlement marker positions. We've gone for this
                // compromise because angular-leaflet-directive doesn't seem to update the render when a geojson style
                // changes like it does with other property updates.
                // See https://github.com/tombatossals/angular-leaflet-directive/issues/489
                $scope.createMap();
                return;
            }

            $scope.markers = MapHelper.getUpdatedMarkers(
                $scope.settlements,
                $scope.markers,
                city.lat,
                city.lng,
                city.area,
                $scope.geojson
            );
        };

        var originalPopulation = history[0]['population'];
        var populationRatio = city.population / originalPopulation;

        $scope.progress = function() {
            $state.go('city.year', {city: city.name, year: history[$scope.historyIndex + 1].year}).then(function(newState) {
                $scope.activeYear = $state.params['year'];
                $scope.updateFigures();
            });
        };

        $scope.back = function() {
            $state.go('city.year', {city: city.name, year: history[$scope.historyIndex - 1].year}).then(function(newState) {
                $scope.activeYear = $state.params['year'];
                $scope.updateFigures();
            });
        };

        $scope.restart = function() {
            $state.go('city', {city: city.name}, {reload: true});
        };

        $scope.city = city;
        $state.current.data = {'pageTitle': $state.params['city']};

        $scope.createMap = function() {
            // Sets $scope.centre, $scope.paths, $scope.geojson, $scope.markers
            angular.extend($scope, MapHelper.buildLeafletData(city, $scope.refugees, $scope.settlements));
        };

        $scope.defaults = {scrollWheelZoom: false};
        $scope.createMap();
        $scope.updateFigures();
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
