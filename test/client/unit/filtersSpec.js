'use strict';

describe('filter', function() {
    beforeEach(
        module('occupied.filters')
    );

    describe('interpolate', function() {
        var testCity = {
            name: 'London',
            lat: 51.5,
            lng: -0.116667,
            population: 8416535, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
            area: 1572
        };

        it('should replace interpolated special text', inject(function(interpolateFilter, basePopulation) {
            var adjustedPopulation = '57,403'; // 12345 * 8416535 [London] / 1810037 [base], rounded and formatted
            expect(interpolateFilter('In {city} there are {population|12345} people moving!', testCity))
                .toEqual('In London there are ' + adjustedPopulation + ' people moving!');
        }));
    });
});
