'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', '$filter', 'leafletData', 'CityData', 'HistoryData', function($scope, $state, $filter, leafletData, CityData, HistoryData) {

        var data = CityData.getCity($state.params['city']);

        if (data === false) {
            $state.go('home');
        }

        $scope.population = $scope.originalPopulation = data.population;

        $scope.historyIndex = 0;
        var history = HistoryData.get();
        $scope.dayHeading = history[0]['label'];

        $scope.progress = function() {
            $scope.historyIndex++;
            $scope.dayHeading = HistoryData.get()[$scope.historyIndex]['label'];
            $scope.population = $scope.originalPopulation * history[$scope.historyIndex]['populationPercentage'] / 100;
        };

        $scope.city = $state.params['city'];


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
