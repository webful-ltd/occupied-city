'use strict';

angular.module('occupied.services', [])

    .value('basePopulation', 1810037) // 1946 total, http://www.jewishvirtuallibrary.org/jsource/Society_&_Culture/israel_palestine_pop.html

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

    .factory('HistoryData', ['basePopulation', function(basePopulation) {
        return {
            get: function() {
                return [
                    {
                        year: 1946,
                        events: [
                            {
                                'virtual': '{city} comes under the auspices of a new, external governing force not fully understood by ' +
                                'its residents. You are issued a new passport. It doesn\'t look like your old one.'
                            }
                        ],
                        population: basePopulation
                    },
                    {
                        year: 1947,
                        events: [
                            {
                                'virtual': 'A new power has begun claiming huge amounts of land in {city} and displacing residents. ' +
                                'Some of your neighbouring boroughs made noises like they were going to help you out, but ' +
                                'it doesn\'t seem to have worked so well. {city} doesn\'t have an army and the newcomers ' +
                                'have been well supplied by their friends internationally.'
                            }
                        ],
                        population: 1500000 // approx, inferring from '46 & '48
                    },
                    {
                        year: 1948,
                        events: [
                            {
                                'virtual': 'It\'s {year|1948}. Over the past two years {population|750000} residents have been ' +
                                'forced out of the city.',
                                'history': 'By 1948 around 750,000 Palestinians had been forced out of the area. ' +
                                '<a class="source" external href="http://www.unrwa.org/palestine-refugees">UNRWA</a>'
                            }
                        ],
                        population: 872700, // 1948 total, http://www.jewishvirtuallibrary.org/jsource/Society_&_Culture/israel_palestine_pop.html
                        occupiedSpace: 0 // todo
                    },
                    {
                        year: 1967,
                        events: [
                            {
                                'virtual': 'Amid heightened tensions, the new residents make a series of preemptive strikes against ' +
                                'friends of {city}. A battle breaks out. {city}\'s casualties are far greater than those ' +
                                'of its opponents.',
                                'history': 'In the Six-Day War of 1967, a further 325,000 Palestinians were forced to ' +
                                'flee. <a class="source" external href="http://www.un.int/wcm/content/site/palestine/cache/offonce/pid/11587">Source</a>'
                            },
                            {
                                'virtual': 'Following the war, its borders are entirely controlled by the new occupier.',
                                'history': '"Israel controls all entry and exit points to the West Bank since it occupied the territory in 1967." ' +
                                    '<a class="source" external href="http://www.maannews.net/eng/ViewDetails.aspx?ID=439273">Source</a>'
                            }
                        ],
                        population: 3022100, //todo infer 'Palestinian' population?
                        settlers: 1, // todo
                        settlements: 1, // todo
                        occupiedSpace: 0 // todo, // km^2
                    },
                    {
                        year: 1972,
                        events: [
                            {
                                'virtual': 'For years after the war, around {population|21000} more original residents ' +
                                'are forced to leave every year.',
                                'history': 'In the years following the Six-Day War, approximately 21,000 Palestinians were ' +
                                    'made to leave annually. <a class="source" external href="http://www.un.int/wcm/content/site/palestine/cache/offonce/pid/11587">Source</a>'
                            }
                        ],
                        settlers: 10608 // http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 1983,
                        settlers: 106595 // http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 1989,
                        settlers: 199900 // http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 1993,
                        settlers: 281800 // http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 2001,
                        events: [
                            {
                                'virtual': 'Education for former {city} folk who have been forced out the city looks starkly different ' +
                                'from that offered to the occupiers\' children. Human rights agencies note that although ' +
                                'a quarter of the children educated in the occupier\'s area are {city} citizens, they are typically ' +
                                'segragated and educated separately in schools with worse conditions.',
                                'history': '"Israel systematically discriminates against Palestinian Arab citizens in its public school system" ' +
                                    '<a class="source" external href="http://www.hrw.org/news/2001/12/04/israeli-schools-separate-not-equal">Human Rights Watch</a>'
                            }
                        ],
                        settlers: 387859 // 2000 figure, http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 2002,
                        events: [
                            {
                                'virtual': 'The occupier has started building a wall encompassing most of the remaining areas ' +
                                'of {city}. Most of it is electrified; some is made of concrete but is 8 meters tall. Some outside ' +
                                'are calling it a security fence. Most {city} natives are referring to it as the racist apartheid ' +
                                'wall. The planned area will take more land from inside {city}\'s current borders, and will ' +
                                'encompass illegal settlements under the guise of security.',
                                'history': '"The fence/wall, in its present configuration, violates Israel’s obligations under international humanitarian law" ' +
                                '<a class="source" external href="http://unispal.un.org/unispal.nsf/35a3b6b85ffcfa2f8525718b0058040c/8749dfdc1b131abd85256f20006ee486?OpenDocument">Amnesty International, 2004</a>. ' +
                                '"The Expansion and Annexation Wall absorbed about 12% of West Bank land" ' +
                                '<a class="source" external href="http://www.pcbs.gov.ps/site/512/default.aspx?tabID=512&lang=en&ItemID=788&mid=3171&wversion=Staging">PCBS</a>'
                            }
                        ],
                        settlers: 414119 // http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                    },
                    {
                        year: 2011,
                        events: [
                            {
                                'virtual': '{city} makes a bid to be recognised as a real city by a body that might give it some ' +
                                'international recognition. In retaliation, the occupier freezes tax revenues to the local government ' +
                                'while still collecting tax from citizens, sending the city into financial chaos and threatening all ' +
                                'public services. Nobody knows when revenues will resume.',
                                'history': 'Israel froze Palestinian tax revenues in 2011 after Palestine was admitted as a member ' +
                                'of UN cultural agency UNESCO. It was widely acknowledged as a humanitarian risk ' +
                                '<a class="source" external href="http://www.maannews.net/eng/ViewDetails.aspx?ID=439273">Source</a>'
                            }
                        ],
                        settlers: 4900000, // 2009 estimate - http://www.hrw.org/en/node/95059/section/5
                        settlerControlledArea: 2399.824, // km^2, 2009 estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                        settlements: 200 // 2009 lower estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                    },
                    {
                        year: 2012,
                        events: [
                            {
                                'virtual': 'The occupier freezes tax again in response to {city}\'s successful bid for a minimal level ' +
                                'of recognition outside its walls.',
                                'history': '"After the Palestinians won the upgraded U.N. rank of observer state in November 2012, Israel ' +
                                'froze the tax monies and also announced plans for 3,000 homes in a highly sensitive area of the West Bank, ' +
                                'as well as in annexed east Jerusalem, triggering a furious response from the international community." ' +
                                '<a class="source" external href="http://english.alarabiya.net/en/News/middle-east/2015/01/05/U-S-opposes-Israel-s-freeze-on-Palestinian-tax-revenue.html">Source</a>'
                            }
                        ],
                        settlers: 460838, // 2005 figure - http://www.fmep.org/settlement_info/settlement-info-and-tables/stats-data/israeli-settler-population-1972-2006
                        settlerControlledArea: 2399.824, // km^2, 2009 estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                        settlements: 225 // 2012 estimate - http://www.btselem.org/settlements/statistics
                    },
                    {
                        year: 2014,
                        events: [
                            {
                                'virtual': 'The occupiers have decided to withold tax revenues from {city} again &ndash; this time as' +
                                'a result of a bid to attain the legal standing to challenge the occupation\'s injustices internationally.',
                                'history': 'Palestinian tax was frozen (again) in January 2015 after the Palestinian government decided ' +
                                'to join the International Criminal Court ' +
                                '<a class="source" external href="http://www.wsj.com/articles/israel-withholds-palestinian-tax-revenues-1420312156">The Wall Street Journal</a>'
                            }
                        ],
                        settlers: 515000, // 2013 estimate - http://www.btselem.org/settlements/statistics
                        settlerControlledArea: 2399.824, // km^2, 2009 estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                        settlements: 225 // 2012 estimate - http://www.btselem.org/settlements/statistics
                    },
                    {
                        year: 2015,
                        events: [
                            {
                                'virtual': '{population|500} {city} residents are now held by the occupying power with no charge ' +
                                'under administrative detention. Each such detention can be renewed at the last second based on only ' +
                                'secret \'evidence\', amounting to indefinite incarceration without trial. The people of {city} are accused ' +
                                'of crimes for which they are tried for in a language they cannot speak. These actions are condemned by ' +
                                'some internationally &nash; but the occupier maintains overwhelming financial support.',
                                'history': 'As of October 2014 there were around 500 Palestinian administrative detainees. Administrative ' +
                                'detentions each last 6 months but can run consecutively with no actual charges brought against the prisoner. ' +
                                '<a class="source" external href="http://www.addameer.org/etemplate.php?id=729">Addameer</a>'
                            },
                            {
                                'virtual': 'Over {{population:5000000}} modern day refugees are living in areas surrounding {city}. They ' +
                                'have their own dedicated United Nations agency.',
                                'history': 'Palestinians number over 5 million refugees today. UNRWA is the UN organisation responsible for ' +
                                'monitoring them. <a class="source" external href="http://www.unrwa.org/palestine-refugees">UNRWA</a>'
                            },
                            'Refugees represent 70% of the {city} inhabitants in the world today. ' +
                            '<a class="source" external href="http://www.key1948.org/about-us/history-of-palestinian-refugees/">Source</a>'
                        ],
                        settlers: 515000, // 2013 estimate - http://www.btselem.org/settlements/statistics
                        settlerControlledArea: 2399.824, // km^2, 2009 estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                        settlements: 225 // 2012 estimate - http://www.btselem.org/settlements/statistics
                    }
                ]
            }
        }
    }])
;
