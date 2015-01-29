'use strict';

angular.module('occupied.services', [])

    .value('basePopulation', 1810037) // 1946 total, http://www.jewishvirtuallibrary.org/jsource/Society_&_Culture/israel_palestine_pop.html
    .value('baseArea', 5860)// km^2, West Bank - https://www.cia.gov/library/publications/the-world-factbook/geos/we.html
        // N.B. all of historical Palestine is more like 26,000km^2 - http://www.plands.org/articles/004.html

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
                        area: 1572,
                        coords: [[[-0.404841,51.425877], [-0.404906,51.425934], [-0.420227,51.431858], [-0.428466,51.432930], [-0.449066,51.435284], [-0.452928,51.439137], [-0.454108,51.442131], [-0.454516,51.442852], [-0.454817,51.444614], [-0.454645,51.447159], [-0.466060,51.460812], [-0.467262,51.462029], [-0.478634,51.466412], [-0.483398,51.467697], [-0.493698,51.465973], [-0.503319,51.472919], [-0.505456,51.473309], [-0.515542,51.477669], [-0.510950,51.485512], [-0.505735,51.486759], [-0.498874,51.504269], [-0.501630,51.508358], [-0.506401,51.518463], [-0.519275,51.522362], [-0.517730,51.529251], [-0.500556,51.535831], [-0.500426,51.536156], [-0.491402,51.539642], [-0.488891,51.554020], [-0.496482,51.565647], [-0.497474,51.567360], [-0.501873,51.572041], [-0.519833,51.576057], [-0.523223,51.590080], [-0.511030,51.597630], [-0.511765,51.612526], [-0.498923,51.621933], [-0.497270,51.623943], [-0.491638,51.632748], [-0.490221,51.637238], [-0.485072,51.638874], [-0.471253,51.639050], [-0.468389,51.637363], [-0.467562,51.637051], [-0.461286,51.635006], [-0.459516,51.633453], [-0.448207,51.628262], [-0.432672,51.629845], [-0.432281,51.629944], [-0.429880,51.630196], [-0.428300,51.630348], [-0.423741,51.630806], [-0.410270,51.630882], [-0.404769,51.611919], [-0.397557,51.611542], [-0.390958,51.614658], [-0.389456,51.615044], [-0.378642,51.617668], [-0.371432,51.622093], [-0.357999,51.621685], [-0.356411,51.622826], [-0.355682,51.623211], [-0.353858,51.623806], [-0.343580,51.635334], [-0.342979,51.639942], [-0.344217,51.645000], [-0.344215,51.645004], [-0.323984,51.654373], [-0.318818,51.652802], [-0.309741,51.648994], [-0.302982,51.649529], [-0.299549,51.649220], [-0.292897,51.649174], [-0.280344,51.653214], [-0.275870,51.661297], [-0.272663,51.666737], [-0.253500,51.677166], [-0.253334,51.677166], [-0.253167,51.676998], [-0.242128,51.670746], [-0.228667,51.685165], [-0.224000,51.686668], [-0.223667,51.686832], [-0.223500,51.686832], [-0.223333,51.686832], [-0.223000,51.686832], [-0.222833,51.686832], [-0.219744,51.684216], [-0.214254,51.678352], [-0.196509,51.677822], [-0.194631,51.678276], [-0.194063,51.678223], [-0.188097,51.678913], [-0.177583,51.677559], [-0.176296,51.677345], [-0.165331,51.680870], [-0.148658,51.686283], [-0.140210,51.687279], [-0.132007,51.703190], [-0.116729,51.708389], [-0.110060,51.720230], [-0.092010,51.710545], [-0.085401,51.710770], [-0.074157,51.707298], [-0.063514,51.696739], [-0.056519,51.689796], [-0.053551,51.687191], [-0.046037,51.684738], [-0.039138,51.683704], [-0.030620,51.685528], [-0.014333,51.695225], [0.001628,51.685284], [-0.000987,51.673939], [0.009613,51.657330], [0.023517,51.660099], [0.043022,51.651924], [0.033666,51.644165], [0.031166,51.632000], [0.043720,51.617062], [0.064931,51.625851], [0.064974,51.626011], [0.065188,51.625908], [0.080198,51.624542], [0.092401,51.614723], [0.101730,51.612587], [0.111794,51.616337], [0.116965,51.611721], [0.135054,51.617138], [0.137844,51.614819], [0.157595,51.605663], [0.162413,51.610912], [0.164408,51.615032], [0.171192,51.627796], [0.184965,51.643375], [0.190715,51.645847], [0.211466,51.637859], [0.228309,51.630470], [0.238658,51.634148], [0.242900,51.633961], [0.256140,51.629658], [0.264701,51.628033], [0.267072,51.628216], [0.270023,51.624958], [0.275833,51.613609], [0.291942,51.601219], [0.291996,51.601208], [0.297950,51.599983], [0.308475,51.593235], [0.328731,51.581867], [0.336112,51.576641], [0.328044,51.569386], [0.325469,51.567039], [0.322798,51.564075], [0.306072,51.566452], [0.295236,51.549675], [0.312252,51.542759], [0.304527,51.541290], [0.298519,51.541771], [0.289378,51.542027], [0.287210,51.541077], [0.280086,51.533577], [0.273284,51.532776], [0.261193,51.520176], [0.255517,51.519478], [0.243587,51.522842], [0.239295,51.522808], [0.226206,51.503052], [0.228333,51.500668], [0.228910,51.500141], [0.229666,51.499001], [0.235333,51.493168], [0.235502,51.484386], [0.234575,51.471146], [0.216207,51.470379], [0.213546,51.468178], [0.207624,51.461655], [0.205307,51.454861], [0.195641,51.453259], [0.191144,51.448952], [0.190962,51.448750], [0.180104,51.445183], [0.174429,51.437725], [0.172991,51.435349], [0.151662,51.429611], [0.146341,51.416340], [0.150632,51.408466], [0.168310,51.401161], [0.169794,51.401802], [0.170159,51.401600], [0.172519,51.399075], [0.171575,51.397800], [0.169429,51.396233], [0.165320,51.391876], [0.161583,51.383568], [0.172833,51.367332], [0.184106,51.371323], [0.185737,51.370922], [0.188076,51.370159], [0.188527,51.369957], [0.182991,51.354736], [0.181617,51.352863], [0.179557,51.345947], [0.173163,51.336571], [0.172605,51.334755], [0.172563,51.334755], [0.159166,51.322834], [0.159000,51.321167], [0.158000,51.320000], [0.153293,51.328251], [0.133300,51.330101], [0.119250,51.326866], [0.108296,51.333157], [0.099483,51.344666], [0.082054,51.328037], [0.080444,51.309559], [0.080831,51.308590], [0.080809,51.307487], [0.082697,51.292198], [0.071411,51.288548], [0.061111,51.287903], [0.050125,51.285164], [0.030555,51.289230], [0.018453,51.283554], [0.014162,51.278660], [0.005664,51.278774], [-0.007596,51.286160], [-0.001364,51.289406], [0.006072,51.302273], [0.004677,51.315189], [-0.009953,51.323799], [-0.016197,51.332451], [-0.020119,51.333977], [-0.033431,51.332958], [-0.044159,51.327366], [-0.060446,51.330479], [-0.066561,51.329594], [-0.081882,51.316879], [-0.079822,51.309837], [-0.078706,51.299122], [-0.073127,51.292305], [-0.089778,51.289619], [-0.095082,51.290619], [-0.101484,51.291401], [-0.102220,51.291389], [-0.106472,51.291115], [-0.119304,51.292171], [-0.120077,51.292171], [-0.120677,51.292423], [-0.123853,51.293392], [-0.130151,51.293068], [-0.139303,51.281086], [-0.140419,51.281094], [-0.152091,51.289082], [-0.152834,51.292831], [-0.152177,51.296169], [-0.150290,51.301811], [-0.155019,51.313969], [-0.153431,51.322201], [-0.160476,51.332100], [-0.171318,51.332329], [-0.179500,51.335999], [-0.192893,51.333523], [-0.200554,51.321739], [-0.210070,51.331474], [-0.211315,51.333775], [-0.213203,51.337597], [-0.214158,51.343929], [-0.229146,51.352932], [-0.237291,51.335171], [-0.233974,51.355274], [-0.252685,51.367493], [-0.263671,51.371780], [-0.266247,51.372154], [-0.273284,51.371780], [-0.287103,51.371834], [-0.287275,51.371727], [-0.292823,51.363850], [-0.297660,51.353935], [-0.296974,51.346161], [-0.298293,51.338943], [-0.298288,51.338017], [-0.298293,51.337852], [-0.301694,51.327984], [-0.311479,51.326267], [-0.315299,51.322765], [-0.331478,51.316559], [-0.337743,51.316292], [-0.353364,51.311462], [-0.359834,51.313000], [-0.355403,51.328346], [-0.348987,51.324066], [-0.330666,51.329498], [-0.325706,51.347691], [-0.319461,51.355152], [-0.321049,51.365997], [-0.321178,51.369156], [-0.316586,51.373680], [-0.321918,51.391167], [-0.327186,51.392338], [-0.327841,51.392483], [-0.334337,51.392296], [-0.335673,51.392155], [-0.336500,51.391998], [-0.338752,51.395157], [-0.341713,51.397774], [-0.351562,51.399204], [-0.370200,51.404800], [-0.375144,51.407200], [-0.379639,51.407459], [-0.395507,51.399204], [-0.398383,51.416901], [-0.400167,51.419167], [-0.404841,51.425877]]]
                    },
                    Birmingham: {
                        lat: 52.483056,
                        lng: -1.893611,
                        population: 1092330, // 2013 - http://www.neighbourhood.statistics.gov.uk/HTMLDocs/dvc134_a/index.html
                        area: 267.77,
                        coords: [[[-1.947262, 52.513363], [-1.932220, 52.526665], [-1.919564, 52.524940], [-1.916681, 52.525848], [-1.904840, 52.530609], [-1.902480, 52.532253], [-1.903595, 52.553902], [-1.899325, 52.533592], [-1.879734, 52.539360], [-1.867675, 52.556316], [-1.845445, 52.558193], [-1.845467, 52.538158], [-1.837100, 52.533741], [-1.819782, 52.532879], [-1.819667, 52.532833], [-1.813774, 52.531574], [-1.812400, 52.531315], [-1.810984, 52.531025], [-1.806564, 52.530426], [-1.797552, 52.528351], [-1.796607, 52.528233], [-1.794891, 52.528179], [-1.791779, 52.527828], [-1.782885, 52.530777], [-1.780353, 52.531433], [-1.778154, 52.530895], [-1.772262, 52.529099], [-1.772006, 52.528996], [-1.761760, 52.528336], [-1.749702, 52.532089], [-1.741504, 52.535461], [-1.739015, 52.536701], [-1.737927, 52.536686], [-1.722353, 52.545998], [-1.734353, 52.528862], [-1.727342, 52.515804], [-1.748242, 52.504047], [-1.730346, 52.490517], [-1.723823, 52.469604], [-1.718158, 52.455173], [-1.717149, 52.453232], [-1.715729, 52.450409], [-1.716613, 52.448059], [-1.724767, 52.450333], [-1.730620, 52.450409], [-1.748585, 52.454102], [-1.762619, 52.466743], [-1.775493, 52.457733], [-1.782574, 52.452347], [-1.791980, 52.449905], [-1.795921, 52.446514], [-1.801618, 52.443321], [-1.807270, 52.442932], [-1.816177, 52.438538], [-1.824009, 52.430267], [-1.833686, 52.419800], [-1.844823, 52.403599], [-1.849479, 52.399933], [-1.862869, 52.399643], [-1.869349, 52.393280], [-1.863212, 52.367424], [-1.872420, 52.391369], [-1.887159, 52.384190], [-1.892995, 52.370239], [-1.893489, 52.369873], [-1.918466, 52.364685], [-1.921234, 52.362888], [-1.931500, 52.362000], [-1.945075, 52.361740], [-1.947498, 52.364594], [-1.958087, 52.370747], [-1.971273, 52.381207], [-1.987538, 52.383385], [-1.994662, 52.387569], [-1.995649, 52.387951], [-2.020454, 52.392769], [-2.029166, 52.416988], [-2.032642, 52.430111], [-2.032384, 52.432835], [-2.027334, 52.445332], [-2.028706, 52.449993], [-2.023333, 52.452831], [-2.017707, 52.456100], [-2.014017, 52.458729], [-2.011173, 52.461411], [-2.007880, 52.461735], [-1.999887, 52.466373], [-1.990834, 52.468498], [-1.987323, 52.471123], [-1.985371, 52.473251], [-1.981379, 52.483158], [-1.967754, 52.487377], [-1.966445, 52.505772], [-1.965909, 52.505997], [-1.947466, 52.513313], [-1.947348, 52.513348], [-1.947262, 52.513363]]]
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
                                'history': '"Israel systematically discriminates against Palestinian Arab citizens in its public school system". ' +
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
                                'history': '"The fence/wall, in its present configuration, violates Israel’s obligations under international humanitarian law". ' +
                                '<a class="source" external href="http://unispal.un.org/unispal.nsf/35a3b6b85ffcfa2f8525718b0058040c/8749dfdc1b131abd85256f20006ee486?OpenDocument">Amnesty International, 2004</a> ' +
                                '<br>"The Expansion and Annexation Wall absorbed about 12% of West Bank land". ' +
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
                                'of UN cultural agency UNESCO. It was widely acknowledged as a humanitarian risk. ' +
                                '<a class="source" external href="http://www.maannews.net/eng/ViewDetails.aspx?ID=439273">Source</a>'
                            },
                            {
                                'virtual': 'Settlers now control {area|2399.824} of the land in the original {city}, out of a total area of {area|5860}.',
                                'history': 'By 2009, settler controlled areas of Palestine totalled an estimated 2,399.8 km² ' +
                                'of land within Palestine. ' +
                                '<a class="source" external href="http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf">Source</a>'
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
                                'virtual': 'The occupiers have decided to withold tax revenues from {city} again &ndash; this time as ' +
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
                                'some internationally &ndash; but the occupier maintains overwhelming financial support.',
                                'history': 'As of October 2014 there were around 500 Palestinian administrative detainees. Administrative ' +
                                'detentions each last 6 months but can run consecutively with no actual charges brought against the prisoner. ' +
                                '<a class="source" external href="http://www.addameer.org/etemplate.php?id=729">Addameer</a>'
                            },
                            {
                                'virtual': 'Over {population|5000000} modern day refugees are living in areas surrounding {city}. They ' +
                                'have their own dedicated United Nations agency.',
                                'history': 'Palestinians number over 5 million refugees today. UNRWA is the UN organisation responsible for ' +
                                'monitoring them. <a class="source" external href="http://www.unrwa.org/palestine-refugees">UNRWA</a>'
                            },
                            {
                                'history': 'Refugees represent 70% of the Palestinians in the world today. ' +
                                '<a class="source" external href="http://www.key1948.org/about-us/history-of-palestinian-refugees/">Source</a>'
                            }
                        ],
                        settlers: 515000, // 2013 estimate - http://www.btselem.org/settlements/statistics
                        settlerControlledArea: 2399.824, // km^2, 2009 estimate - http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf
                        settlements: 225 // 2012 estimate - http://www.btselem.org/settlements/statistics
                    }
                ]
            }
        }
    }])

    .factory('MapHelper', ['$filter', function($filter) {
        return {
            /**
             * Takes a city object and returns an object with 'center', 'paths' and 'geojson' keys suitable for using
             * directly with Leaflet directive
             *
             * @param {object} city Should have keys 'name', 'lat', 'lng', 'area' and optionally 'coords'
             * @returns {{center: {lat: *, lng: *, zoom: number}, paths: {}, geojson: {}}}
             */
            buildLeafletData: function(city) {
                var geojson = {};
                var paths = {};
                var circleRadius = Math.sqrt(city.area / Math.PI) * 1000; // in m

                if ('coords' in city) {
                    geojson = {
                        data: {
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "properties": {"name": city.name},
                                    "geometry": {
                                        "type": "Polygon",
                                        "coordinates": city['coords']
                                    }
                                }
                            ]
                        },
                        style: {
                            fillColor: '#9f9',
                            weight: 2,
                            opacity: 1,
                            color: '#fff',
                            dashArray: '3',
                            fillOpacity: 0.7
                        }
                    }
                } else {
                    paths = {
                        circle: {
                            type: 'circle',
                            weight: 2,
                            color: '#9f9',
                            radius: circleRadius,
                            latlngs: {lat: city.lat, lng: city.lng},
                            message: '<h3>An approximation of ' + city.name + '!</h3>' +
                            '<p>For now we\'re just using a circle with its area of ' + $filter('number')(city.area) +
                            'km².</p>'
                        }
                    }
                }

                return {
                    center: {
                        lat: city.lat,
                        lng: city.lng,
                        zoom: Math.round(11 - Math.sqrt(city.area) / 20)
                    },
                    paths: paths,
                    geojson: geojson
                }
            }
        }
    }])
;
