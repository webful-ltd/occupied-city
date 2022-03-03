'use strict';

angular.module('occupied.filters', ['occupied.services'])

    /**
     *  Filter to insert adjusted/ filled-in values for {city}, {population|...}, {area|...}, {year|...}.
     *
     *  Year must be a full 4-digit value.
     *  Population must be an integer with no commas.
     *  Area must be an int or float with no commas.
     *  Area will have unit (km^2) appended to the number.
     */
    .filter('interpolate', ['$filter', 'basePopulation', 'baseArea', function($filter, basePopulation, baseArea) {
        return function(text, city) {
            text = text.replace(new RegExp('{city}', 'g'), city.name);

            text = text.replace(new RegExp('\\{population\\|([0-9]+)\\}', 'g'), function(match, capture) {
                return $filter('number')(parseInt(capture) * city.population / basePopulation, 0);
            });

            text = text.replace(new RegExp('\\{area\\|([0-9.]+)\\}', 'g'), function(match, capture) {
                return $filter('number')(parseFloat(capture) * city.area / baseArea, 1) + ' km²';
            });

            text = text.replace(new RegExp('\\{year\\|([0-9]{4})\\}', 'g'), function(match, capture) {
                return parseInt(capture) + (new Date()).getFullYear() - 1946;
            });

            return text;
        };
    }]);
