// Data service converted from AngularJS to plain JavaScript for Vue.js

// Base constants
export const basePopulation = 1810037 // 1946 total
export const baseArea = 6209 // km^2, approx for West Bank & Gaza

// City data (generated from the legacy AngularJS CityData._getAll())
import citiesData from './cities-data'

export function getPlaces() {
  const cities = []
  const countries = []

  Object.keys(citiesData).forEach(name => {
    if (citiesData[name].country) {
      countries.push(name)
    } else {
      cities.push(name)
    }
  })

  return { cities, countries }
}

export function getCityData(cityName) {
  return citiesData[cityName]
}

export function getAllCitiesData() {
  return citiesData
}
