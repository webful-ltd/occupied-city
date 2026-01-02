<template>
  <div id="app">
    <div id="header">
      <h1><router-link to="/" aria-label="Occupied City home page">Occupied City</router-link></h1>
      <ul id="menu">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>

    <div id="main">
      <router-view />
    </div>

    <div id="footer">
      <ul id="credits">
        <li>Concept: James</li>
        <li>Code: <a target="_blank" href="https://noellh.com">Noel</a></li>
        <li>Maps: <a target="_blank" href="http://leafletjs.com">Leaflet</a></li>
        <li>Tiles: <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a></li>
        <li>City outlines: <a target="_blank" href="http://code.flickr.net/2011/01/08/flickr-shapefiles-public-dataset-2-0/">Flickr Shapefiles</a></li>
      </ul>
      <p>Occupied City is <a target="_blank" href="https://github.com/webful-ltd/occupied-city">open source</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

