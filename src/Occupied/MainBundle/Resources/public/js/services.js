'use strict';

angular.module('occupied.services', [])
    .factory('CityData', function() {
        return {
            /**
             * Gets data for all cities. N.B. area is km^2 and is for the 'city' / centre.
             * Population estimate dates and sources are in comments.
             *
             * @returns object  All our data, keyed on city name
             * @private
             */
            _getAll: function() {
                return {
                    London: {
                        lat: 51.5,
                        lng: -0.116667,
                        population: 8416535, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 1572
                    },
                    Birmingham: {
                        lat: 52.483056,
                        lng: -1.893611,
                        population: 1092330, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 267.77
                    },
                    Manchester: {
                        lat: 53.466667,
                        lng: -2.233333,
                        population: 514417, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 115.65
                    },
                    Liverpool: {
                        lat: 53.4,
                        lng: -2.983333,
                        population: 470780, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 111.84
                    },
                    Leeds: {
                        lat: 53.799722,
                        lng: -1.549167,
                        population: 761481, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 487.8
                    },
                    Madrid: {
                        lat: 40.4,
                        lng: -3.6833333,
                        population: 3165235, // 2014 - http://en.wikipedia.org/wiki/Madrid
                        area: 605.77
                    },
                    Rome: {
                        lat: 41.9,
                        lng: 12.4833333,
                        population: 2870528, // 2014 - http://www.demo.istat.it/bilmens2014gen/query.php?lingua=ita&Rip=S3&Reg=R12&Pro=P058&Com=91&submit=Tavola
                        area: 1285
                    },
                    Lisbon: {
                        lat: 38.7166667,
                        lng: -9.1333333,
                        population: 552700, // 2011 - census
                        area: 100.05
                    },
                    Berlin: {
                        lat: 52.5166667,
                        lng: 13.4,
                        population: 3419623, // 2013 - https://www.statistik-berlin-brandenburg.de/Publikationen/OTab/2014/OT_A01-10-00_124_201311_BE.pdf
                        area: 891.85
                    },
                    Paris: {
                        lat: 48.866667,
                        lng: 2.333333,
                        population: 2241346, // 2014 - http://www.insee.fr/fr/themes/tableau.asp?reg_id=20&ref_id=poptc02101
                        area: 105.4
                    },
                    Brussels: {
                        lat: 50.8333,
                        lng: 4,
                        population: 1138854, // 2013 - http://statbel.fgov.be/nl/binaries/pop2010-2013mov_nl_tcm325-234223.xls
                        area: 161.38
                    }
                    // TODO add the 9 really populous cities here: http://www.ibtimes.co.uk/world-population-day-2014-top-10-most-populous-cities-revealed-1456214
                };
            },

            /**
             * @param {string} city
             * @returns {object|bool}   All data for the given city if available, false if not
             */
            getCity: function(city) {
                var data = this._getAll();

                return (city in data) ? data[city] : false;
            },

            getCityNames: function() {
                var keys = [];
                for (var key in this._getAll()) {
                    keys.push(key);
                }

                return keys;
            }

        };
    })

    .factory('HistoryData', function() {
        return {
            get: function() {
                return [
                    {
                        label: 'Day One',
                        events: [
                            '{city} comes under the auspices of a new, external governing force not fully understood by' +
                            'its residents. You are issued a new passport. It doesn\'t look like your old one.'
                        ],
                        populationPercentage: 100,
                        settlers: 0,
                        occupiedSpace: 0 // km^2
                    },
                    {
                        label: '1947',
                        events: [
                            'A new power has begun claiming huge amounts of land in {city} and displacing residents.' +
                            'Some of your neighbouring boroughs made noises like they were going to help you out, but' +
                            'it doesn\'t seem to have worked so well. {city} doesn\'t have an army and the newcomers' +
                            'have been well supplied by their friends internationally.'
                        ],
                        populationPercentage: 100,
                        settlers: 0,
                        occupiedSpace: 0 // todo
                    },
                    {
                        label: '1948'
                    }
                ]
            }
        }
    })
;
