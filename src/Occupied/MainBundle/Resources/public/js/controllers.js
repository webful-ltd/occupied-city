'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', function() {
    })

    .controller('CityController', ['$scope', '$state', 'leafletData', function($scope, $state, leafletData) {
        $state.current.data = {'pageTitle': $state.params['city']};

        var cities = {
            Madrid: {
                lat: 40.4,
                lng: -3.6833333
            },
            Rome: {
                lat: 41.9,
                lng: 12.4833333
            },
            London: {
                lat: 51.5,
                lng: -0.116667
            },
            Lisbon: {
                lat: 38.7166667,
                lng: -9.1333333
            },
            Berlin: {
                lat: 52.5166667,
                lng: 13.4
            },
            Paris: {
                lat: 48.866667,
                lng: 2.333333
            },
            Brussels: {
                lat: 50.8333,
                lng: 4
            }

        };

        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            },
            markers: {
                mainMarker: {
                    lat: 51,
                    lng: 0,
                    focus: true,
                    message: "Draggable marker",
                    draggable: true
                }
            }

        });
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
