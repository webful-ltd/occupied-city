'use strict';

angular.module('occupied.controllers', [])

    .controller('HomeController', ['$scope', 'CityData', function($scope, CityData) {
        $scope.cityNames = CityData.getCityNames();
    }])

    .controller('CityController', ['$scope', '$state', 'leafletData', 'CityData', function($scope, $state, leafletData, CityData) {

        var data = CityData.getCity($state.params['city']);

        if (data === false) {
            $state.go('home');
        }

        $state.current.data = {'pageTitle': $state.params['city']};

        angular.extend($scope, {
            center: {
                lat: data.lat,
                lng: data.lng,
                zoom: 10
            }
            //},
            //markers: {
            //    mainMarker: {
            //        lat: 51,
            //        lng: 0,
            //        focus: true,
            //        message: "Draggable marker",
            //        draggable: true
            //    }
            //}

        });
    }])

    .controller('AboutController', function() {
    })

    .controller('ContactController', function() {
    })

;
