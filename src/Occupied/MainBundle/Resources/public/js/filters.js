'use strict';

angular.module('occupied.filters', [])

    .filter('interpolate', ['$filter', 'basePopulation', function($filter, basePopulation) {
        return function(text, city) {
            text = text.replace(new RegExp('{city}', 'g'), city.name);

            text = text.replace(new RegExp('\\{population\\|([0-9]+)\\}', 'g'), function(match, capture) {
                return $filter('number')(parseInt(capture) * city.population / basePopulation, 0);
            });

            text = text.replace(new RegExp('\\{year\\|([0-9]+)\\}', 'g'), function(match, capture) {
                return parseInt(capture) + (new Date()).getFullYear() - 1946;
            });

            return text;
        };
    }]);
