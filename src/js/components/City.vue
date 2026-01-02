<template>
  <div>
    <h4 class="city-title">
      <a
        href="#"
        @click.prevent="restart"
        :aria-label="`View ${city?.name} from the start.`"
        :title="`Start over from ${thisYear}`"
      >{{ city?.name }}</a>
    </h4>

    <div class="city-nav-container">
      <button class="city-nav back" @click="back" :disabled="!canGoBack" aria-label="Back" tabindex="100">&lt;</button>
      <button class="city-nav next" @click="progress" :disabled="!canGoForward" aria-label="Forward" tabindex="1">&gt;&gt;</button>
    </div>

    <p class="clear" v-if="!canGoBack">
      How would {{ city?.name }} be affected by an illegal occupation? We'll start today and use the current population of
      ~{{ formatNumber(city?.population || 0) }}.
    </p>

    <div class="leaflet-container">
      <div ref="mapEl" style="height: 100%; width: 100%"></div>
    </div>

    <div class="vitals">
      <h4>{{ dayHeading }}</h4>
      <p>Local population: <strong>{{ formatNumber(population) }}</strong></p>
      <p v-if="refugees > 0">Refugees: <strong>{{ formatNumber(refugees) }}</strong></p>
      <p v-if="settlers > 0">Settlers: <strong>{{ formatNumber(settlers) }}</strong></p>
      <p v-if="settlements">Settlements: <strong>{{ formatNumber(settlements) }}</strong></p>
      <p v-if="settlerArea">Settler controlled area: <strong>{{ formatNumber(settlerArea) }}km²</strong></p>
    </div>

    <div v-for="(event, idx) in events" :key="idx" class="event-container">
      <p v-if="event.virtual" class="virtual event" v-html="interpolate(event.virtual, city)" />
      <p v-if="event.history" class="history event" v-html="interpolate(event.history, city)" />
    </div>

    <ul class="notes">
      <li>
        When talking about fictional {{ city?.name }} we use areas and population numbers in proportion to 1940s Palestine.
        We try make {{ thisYear }} {{ city?.name }} analogous to 1946 Palestine.
      </li>
      <li>To simplify area calculations we mostly just consider the West Bank, taken to be 5,860km².</li>
      <li>Estimated numbers of settlements include unofficial 'outposts'.</li>
    </ul>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet.awesome-markers'

import { interpolate, formatNumber } from '../utils'
import { getCityByName, getHistory, getPopulationRatio } from '../city-service'
import { buildLeafletData, getUpdatedMarkers } from '../map-helper'

export default {
  name: 'City',
  data() {
    return {
      city: null,
      history: [],
      historyIndex: 0,
      thisYear: new Date().getFullYear(),

      // derived UI state
      activeYear: null,
      dayHeading: null,
      population: 0,
      refugees: 0,
      settlers: 0,
      settlements: 0,
      settlerArea: 0,
      events: [],
      canGoForward: false,
      canGoBack: false,

      // map
      map: null,
      geojsonLayer: null,
      markersLayer: null,
      circleLayer: null,
      markers: []
    }
  },
  computed: {
    populationRatio() {
      return this.city ? getPopulationRatio(this.city) : 1
    }
  },
  methods: {
    interpolate,
    formatNumber,

    restart() {
      this.$router.push({ name: 'city', params: { city: this.city.name } })
    },
    progress() {
      const next = this.history[this.historyIndex + 1]
      if (!next) return
      this.$router.push({ name: 'city', params: { city: this.city.name, year: next.year } })
    },
    back() {
      const prev = this.history[this.historyIndex - 1]
      if (!prev) return
      this.$router.push({ name: 'city', params: { city: this.city.name, year: prev.year } })
    },

    ensureMap() {
      if (this.map || !this.$refs.mapEl) return

      this.map = L.map(this.$refs.mapEl, { scrollWheelZoom: false })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map)

      this.markersLayer = L.layerGroup().addTo(this.map)
    },

    redrawMap() {
      this.ensureMap()
      if (!this.map || !this.city) return

      // Clear old layers
      if (this.geojsonLayer) {
        this.map.removeLayer(this.geojsonLayer)
        this.geojsonLayer = null
      }
      if (this.circleLayer) {
        this.map.removeLayer(this.circleLayer)
        this.circleLayer = null
      }
      if (this.markersLayer) {
        this.markersLayer.clearLayers()
      }

      const { center, paths, geojson, markers, colour } = buildLeafletData(
        this.city,
        this.refugees,
        this.settlements,
        null
      )

      // (Re)create base shape
      if (geojson) {
        this.geojsonLayer = L.geoJSON(geojson, {
          style: {
            fillColor: colour,
            weight: 2,
            opacity: 1,
            color: '#fff',
            dashArray: '3',
            fillOpacity: 0.7
          }
        }).addTo(this.map)
      } else if (paths.circle) {
        this.circleLayer = L.circle([paths.circle.latlngs.lat, paths.circle.latlngs.lng], {
          radius: paths.circle.radius,
          color: paths.circle.color,
          weight: paths.circle.weight,
          fillColor: paths.circle.color,
          fillOpacity: 0.35
        }).addTo(this.map)
      }

      // Set view
      this.map.setView([center.lat, center.lng], center.zoom)

      // Markers
      this.markers = markers
      this.addMarkersToMap()

      // If we've got a geojson outline, refine marker placement inside polygon.
      if (this.geojsonLayer) {
        this.markers = getUpdatedMarkers(
          this.settlements,
          this.markers,
          this.city.lat,
          this.city.lng,
          this.city.area,
          this.geojsonLayer
        )
        this.addMarkersToMap()
      }
    },

    addMarkersToMap() {
      if (!this.markersLayer) return
      this.markersLayer.clearLayers()

      const AwesomeMarkers = L.AwesomeMarkers

      for (const m of this.markers) {
        const icon = AwesomeMarkers && AwesomeMarkers.icon
          ? AwesomeMarkers.icon({
              icon: 'home',
              prefix: 'fa',
              markerColor: 'lightblue',
              iconColor: 'white'
            })
          : undefined

        L.marker([m.lat, m.lng], { icon }).addTo(this.markersLayer)
      }
    },

    updateFigures() {
      // find history index for activeYear
      this.historyIndex = 0
      for (let ii = 0; ii < this.history.length; ii++) {
        if (String(this.history[ii].year) === String(this.activeYear)) {
          this.historyIndex = ii
          break
        }
      }

      const firstYear = this.history[0].year
      const offset = this.thisYear - firstYear

      // invalid year? go home for this city.
      if (this.$route.params.year && this.historyIndex === 0 && String(this.$route.params.year) !== String(firstYear)) {
        this.$router.replace({ name: 'city', params: { city: this.city.name } })
        return
      }

      const current = this.history[this.historyIndex]

      this.dayHeading = parseInt(this.activeYear, 10) + offset

      this.refugees = 0
      this.settlers = 0
      this.settlements = 0
      this.settlerArea = 0

      this.population = parseInt(current.population * this.populationRatio, 10)
      if (current.refugees) this.refugees = parseInt(current.refugees * this.populationRatio, 10)
      if (current.settlers) this.settlers = parseInt(current.settlers * this.populationRatio, 10)
      if (current.settlements) this.settlements = parseInt(current.settlements, 10)
      if (current.settlerControlledArea) {
        const originalArea = this.history[0].area
        const areaRatio = this.city.area / originalArea
        this.settlerArea = parseInt(current.settlerControlledArea * areaRatio, 10)
      }

      this.events = current.events || []
      this.canGoForward = this.historyIndex < this.history.length - 1
      this.canGoBack = this.historyIndex > 0

      this.redrawMap()
    },

    loadCityFromRoute() {
      const cityParam = this.$route.params.city
      const yearParam = this.$route.params.year

      const city = getCityByName(cityParam)
      if (!city) {
        this.$router.replace({ name: 'home' })
        return
      }

      // Enforce canonical case for sharing URLs
      if (city.name !== cityParam) {
        this.$router.replace({ name: 'city', params: { city: city.name, year: yearParam } })
        return
      }

      this.city = city
      this.history = getHistory()

      const firstYear = this.history[0].year
      this.activeYear = yearParam || firstYear

      document.title = `${city.name} - Occupied City`

      this.updateFigures()
    }
  },
  mounted() {
    this.loadCityFromRoute()
  },
  watch: {
    '$route.params.city': function () {
      this.loadCityFromRoute()
    },
    '$route.params.year': function () {
      this.loadCityFromRoute()
    }
  }
}
</script>

