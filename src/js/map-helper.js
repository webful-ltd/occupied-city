// Small Vue-friendly replacement for the AngularJS MapHelper service.
// Returns data structures that Leaflet can consume directly.

import * as leafletPip from 'leaflet-pip'

export function buildLeafletData(city, refugees, numMarkers, geojsonLayerForPointInPolygon = null) {
  const colour = refugees > 0 ? '#f99' : '#9f9'
  const circleRadius = Math.sqrt(city.area / Math.PI) * 1000 // m

  let geojson = null
  let paths = {}

  let geometry = null
  if (city.coords) {
    geometry = { type: 'Polygon', coordinates: city.coords }
  } else if (city.multicoords) {
    geometry = { type: 'MultiPolygon', coordinates: city.multicoords }
  }

  if (geometry) {
    geojson = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', properties: { name: city.name }, geometry }]
    }
  } else {
    paths = {
      circle: {
        type: 'circle',
        weight: 2,
        color: colour,
        radius: circleRadius,
        latlngs: { lat: city.lat, lng: city.lng }
      }
    }
  }

  const markers = addMarkers(numMarkers, [], city.lat, city.lng, city.area, geojsonLayerForPointInPolygon)

  const baseZoom = window.innerWidth > 700 ? 11 : 10

  return {
    center: {
      lat: city.lat,
      lng: city.lng,
      zoom: Math.round(baseZoom - Math.pow(city.area, 1 / 2.7) / 15)
    },
    paths,
    geojson,
    markers,
    colour
  }
}

export function getUpdatedMarkers(requiredMarkers, markers, lat, lng, area, geojsonLayerForPointInPolygon = null) {
  if (requiredMarkers === markers.length) return markers
  if (requiredMarkers > markers.length) return addMarkers(requiredMarkers, markers, lat, lng, area, geojsonLayerForPointInPolygon)
  return markers.slice(0, requiredMarkers)
}

function addMarkers(requiredMarkers, markers, lat, lng, area, geojsonLayerForPointInPolygon) {
  const radius = Math.sqrt(area / Math.PI)

  // If we have a GeoJSON Leaflet layer, we can keep markers inside the polygon.
  // Otherwise we fall back to the circle approximation.
  const usePip = !!geojsonLayerForPointInPolygon

  let attempts = 0
  while (markers.length < requiredMarkers) {
    const poss = generatePoint(lat, lng, radius * (usePip ? 1.3 : 1))

    if (!usePip) {
      markers.push(poss)
      continue
    }

    const matches = leafletPip.pointInLayer([poss.lng, poss.lat], geojsonLayerForPointInPolygon, true)
    if (matches.length > 0) {
      markers.push(poss)
    }

    if (attempts++ > requiredMarkers * 4 + 10) {
      console.log('Stopping marker generation - not finished after ' + attempts + ' attempts')
      break
    }
  }

  return markers
}

function generatePoint(lat, lng, radiusKm) {
  // Based on http://stackoverflow.com/a/2188606/2803757
  const dist = Math.random() * radiusKm * 2 * 1000 // m
  const bearing = Math.random() * Math.PI * 2

  const dx = dist * Math.sin(bearing)
  const dy = dist * Math.cos(bearing)
  const deltaLat = dy / 110540
  const deltaLng = dx / (111320 * Math.cos(lat))

  const newLat = lat + deltaLat
  const newLng = lng + deltaLng

  return {
    lat: newLat,
    lng: newLng,
    draggable: false,
    icon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'home',
      markerColor: 'lightblue',
      iconColor: 'white'
    }
  }
}

