'use strict';

describe('filter', function() {
    beforeEach(
        module('occupied.services')
    );

    /**
     * basePopulation - super-simple services sanity check
     */
    describe('basePopulation', function() {
        it('should return current expected base population', inject(function(basePopulation) {
            expect(basePopulation).toEqual(1810037);
        }));
    });

});
