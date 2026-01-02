// Non-framework port of the AngularJS CityData + HistoryData services.
// Kept intentionally small/simple for maintenance-mode.

import { baseArea, basePopulation } from './data-service'

// Note: we load the city dataset from the existing AngularJS file at build time by
// parsing out the object is overkill. Instead, we keep using the data-service's
// citiesData via getAllCitiesData().
import { getAllCitiesData } from './data-service'

// History data is copied from the AngularJS HistoryData factory with minimal edits.
export function getHistory() {
  return [
    {
      year: 1946,
      events: [
        {
          virtual:
            "{city} comes under the auspices of a new, external governing force not fully understood by its residents. You are issued a new passport. It doesn't look like your old one."
        }
      ],
      population: basePopulation,
      area: baseArea
    },
    {
      year: 1947,
      events: [
        {
          virtual:
            "A new power has begun claiming huge amounts of land in {city} and displacing residents. Some neighbouring boroughs made noises like they were going to help you out, but it doesn't seem to have worked so well. {city} doesn't have an army and the newcomers have been well supplied by their friends internationally."
        }
      ],
      population: 1500000
    },
    {
      year: 1948,
      events: [
        {
          virtual:
            "It's {year|1948}. Over the past two years {population|750000} residents have been forced out of the city.",
          history:
            'By 1948 around 750,000 Palestinians had been forced out of the area. <a class="source" href="http://www.unrwa.org/palestine-refugees" target="_blank" rel="noopener noreferrer">UNRWA</a>'
        }
      ],
      population: 872700,
      refugees: 750000
    },
    {
      year: 1967,
      events: [
        {
          virtual:
            "Amid heightened tensions, the new residents make a series of preemptive strikes against friends of {city}. A battle breaks out. {city}'s casualties are far greater than those of its opponents.",
          history:
            'In the Six-Day War of 1967, a further 325,000 Palestinians were forced to flee. <a class="source" href="http://www.un.int/wcm/content/site/palestine/cache/offonce/pid/11587" target="_blank" rel="noopener noreferrer">Source</a>'
        },
        {
          virtual:
            'Following the war, its borders are entirely controlled by the new occupier.',
          history:
            '"Israel controls all entry and exit points to the West Bank since it occupied the territory in 1967." <a class="source" href="http://www.maannews.net/eng/ViewDetails.aspx?ID=439273" target="_blank" rel="noopener noreferrer">Source</a>'
        }
      ],
      population: 544600,
      refugees: 2166384,
      settlers: 100,
      settlements: 1
    },
    {
      year: 1972,
      events: [
        {
          virtual:
            'For years after the war, around {population|21000} more original residents are forced to leave every year.',
          history:
            'In the years following the Six-Day War, approximately 21,000 Palestinians were made to leave annually. <a class="source" href="http://www.un.int/wcm/content/site/palestine/cache/offonce/pid/11587" target="_blank" rel="noopener noreferrer">Source</a>'
        }
      ],
      population: 1030000,
      refugees: 2492977,
      settlers: 10608,
      settlements: 14
    },
    {
      year: 1983,
      population: 1360000,
      refugees: 3237190,
      settlers: 22800,
      settlements: 76
    },
    {
      year: 1989,
      population: 1900000,
      refugees: 3792819,
      settlers: 69800,
      settlements: 115
    },
    {
      year: 1993,
      population: 1900000,
      refugees: 4859029,
      settlers: 257700,
      settlements: 125
    },
    {
      year: 2001,
      events: [
        {
          virtual:
            "Education for former {city} folk who have been forced out the city looks starkly different from that offered to the occupiers' children. Human rights agencies note that although a quarter of the children educated in the occupier's area are {city} citizens, they are typically segregated and educated separately in schools with worse conditions.",
          history:
            '"Israel systematically discriminates against Palestinian Arab citizens in its public school system". <a class="source" href="http://www.hrw.org/news/2001/12/04/israeli-schools-separate-not-equal" target="_blank" rel="noopener noreferrer">Human Rights Watch</a>'
        }
      ],
      population: 3110000,
      refugees: 5497857,
      settlers: 387859,
      settlements: 128
    },
    {
      year: 2002,
      events: [
        {
          virtual:
            'The occupier has started building a wall encompassing most of the remaining areas of {city}. Most of it is electrified; some is made of concrete but is 8 meters tall. Some outside are calling it a security fence. Most {city} natives are referring to it as the racist apartheid wall. The planned area will take more land from inside {city}\'s current borders, and will encompass illegal settlements under the guise of security.',
          history:
            '"The fence/wall, in its present configuration, violates Israel’s obligations under international humanitarian law". <a class="source" href="http://unispal.un.org/unispal.nsf/35a3b6b85ffcfa2f8525718b0058040c/8749dfdc1b131abd85256f20006ee486?OpenDocument" target="_blank" rel="noopener noreferrer">Amnesty International, 2004</a>'
        }
      ],
      population: 3110000,
      refugees: 5639931,
      settlers: 414119,
      settlements: 135
    },
    {
      year: 2011,
      events: [
        {
          virtual:
            'Settlers now control {area|2399.824} of the land in the original {city}, out of a total area of {area|' +
            baseArea +
            '}.',
          history:
            'By 2009, settler controlled areas of Palestine totalled an estimated 2,399.8 km² of land within Palestine. <a class="source" href="http://www.btselem.org/download/201007_by_hook_and_by_crook_eng.pdf" target="_blank" rel="noopener noreferrer">Source</a>'
        }
      ],
      population: 4120000,
      refugees: 6641799,
      settlers: 4900000,
      settlerControlledArea: 2399.824,
      settlements: 200
    },
    {
      year: 2012,
      population: 4120000,
      refugees: 6641799,
      settlers: 460838,
      settlerControlledArea: 2399.824,
      settlements: 225
    },
    {
      year: 2014,
      population: 4120000,
      refugees: 6641799,
      settlers: 515000,
      settlerControlledArea: 2399.824,
      settlements: 225
    },
    {
      year: 2015,
      events: [
        {
          virtual:
            "{population|500} {city} residents are now held by the occupying power with no charge under administrative detention. Each such detention can be renewed at the last second based on only secret 'evidence', amounting to indefinite incarceration without trial. The people of {city} are accused of crimes for which they are tried for in a language they cannot speak. These actions are condemned by some internationally – but the occupier maintains overwhelming financial support.",
          history:
            'As of October 2014 there were around 500 Palestinian administrative detainees. <a class="source" href="http://www.addameer.org/etemplate.php?id=729" target="_blank" rel="noopener noreferrer">Addameer</a>'
        }
      ],
      population: 4120000,
      refugees: 6641799,
      settlers: 515000,
      settlerControlledArea: 2399.824,
      settlements: 225
    }
  ]
}

export function getCityByName(city) {
  const data = getAllCitiesData()
  const wanted = (city || '').toLowerCase()

  for (const cityName of Object.keys(data)) {
    if (cityName.toLowerCase() === wanted) {
      return { ...data[cityName], name: cityName }
    }
  }

  return null
}

export function getPopulationRatio(city) {
  const history = getHistory()
  const originalPopulation = history[0].population
  return city.population / originalPopulation
}

