'use strict';

angular.module('occupied.services', [])
    .factory('CityData', function() {
        return {
            /**
             * @returns object  All our data, keyed on city name
             * @private
             */
            _getAll: function() {
                return {
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
            },

            /**
             * @param {string} city
             * @returns {object|bool}   All data for the given city if available, false if not
             */
            getCity: function(city) {
                var data = this._getAll();
                return (city in data) ? data[city] : false;
            }

        };
    });
