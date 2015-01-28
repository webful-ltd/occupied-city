'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'leafletData', 'CityData', 'HistoryData', 'baseArea', function($scope, $state, $filter, leafletData, CityData, HistoryData, baseArea) {

        var data = CityData.getCity($state.params['city']);

        if (data === false) {
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

        data['name'] = $state.params['city'];
        $scope.city = data;
        $state.current.data = {'pageTitle': $state.params['city']};

        var circleRadius = Math.sqrt(data.area / Math.PI) * 1000; // in m

        angular.extend($scope, {
            center: {
                lat: data.lat,
                lng: data.lng,
                zoom: 10
            },
            paths: {
                circle: {
                    type: 'circle',
                    weight: 3,
                    color: '#000',
                    radius: circleRadius,
                    latlngs: {lat: data.lat, lng: data.lng},
                    message: '<h3>An approximation of ' + $state.params['city'] + '!</h3>' +
                        '<p>For now we\'re just using a circle with its area of ' + $filter('number')(data.area) +
                        'km².</p>'
                }
            }
        });
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
