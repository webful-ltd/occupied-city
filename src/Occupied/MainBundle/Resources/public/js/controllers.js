'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'leafletData', 'CityData', 'HistoryData', 'baseArea', function($scope, $state, $filter, leafletData, CityData, HistoryData, baseArea) {

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

        var circleRadius = Math.sqrt(city.area / Math.PI) * 1000; // in m

        var geojson = {};
        var paths = {};

        if ('coords' in city) {
            geojson = {
                data: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {"name": city.name},
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": city['coords']
                            }
                        }
                    ]
                },
                style: {
                    fillColor: '#9f9',
                    weight: 2,
                    opacity: 1,
                    color: '#fff',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }
        } else {
            paths = {
                circle: {
                    type: 'circle',
                    weight: 2,
                    color: '#9f9',
                    radius: circleRadius,
                    latlngs: {lat: city.lat, lng: city.lng},
                    message: '<h3>An approximation of ' + $state.params['city'] + '!</h3>' +
                    '<p>For now we\'re just using a circle with its area of ' + $filter('number')(city.area) +
                    'km².</p>'
                }
            }
        }

        angular.extend($scope, {
            center: {
                lat: city.lat,
                lng: city.lng,
                zoom: Math.round(11 - Math.sqrt(city.area) / 20)
            },
            paths: paths,
            geojson: geojson
        });
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
