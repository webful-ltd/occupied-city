<template>
  <div>
    <h4>Visualise an Occupation of your city.</h4>
    <p>How would your life be affected by occupation? Choose a place to explore an alternative reality.</p>

    <div class="place-list">
      <h4>Cities</h4>
      <ul>
        <li v-for="name in sortedCities" :key="name">
          <router-link :to="`/${name}`">{{ name }}</router-link>
        </li>
      </ul>
    </div>

    <div class="place-list">
      <h4>Countries</h4>
      <ul>
        <li v-for="name in sortedCountries" :key="name">
          <router-link :to="`/${name}`">{{ name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPlaces } from '../data-service'

export default {
  name: 'Home',
  data() {
    const places = getPlaces()
    return {
      cities: places.cities,
      countries: places.countries
    }
  },
  computed: {
    sortedCities() {
      return [...this.cities].sort()
    },
    sortedCountries() {
      return [...this.countries].sort()
    }
  }
}
</script>

