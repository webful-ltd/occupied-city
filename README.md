# Occupied City

This is the codebase for Occupied City. It runs on Vue 3 (see `src/js/App.vue`).

The site lives at **[OccupiedCity.webful.uk](https://occupiedcity.webful.uk)** and is released as
[open source](https://github.com/webful-ltd/occupied-city) under the MIT Licence.

## Try it out (local dev server)

```bash
npm i
npm run dev
```

This starts a local dev server (no Apache needed).

If you want it to open your browser automatically:

```bash
npm run dev:open
```

If it doesn’t open automatically (or you used `dev`), visit:

- http://localhost:8080/

## Build

```bash
npm run build:dev
```

Webpack output is written to `./web`.

## Issues
Issues are [tracked on GitHub](https://github.com/webful-ltd/occupied-city/issues).

# Mapping
We currently use [Leaflet](http://leafletjs.com/) for maps.

### City outlines
We're using [Flickr Shapefiles](http://code.flickr.net/2011/01/08/flickr-shapefiles-public-dataset-2-0/) locality data
to produce approximate outlines for each included city.

### Country outlines
As Flickr shapes were even more noticeably off for at least some countries, we use
[these approximations](https://github.com/johan/world.geo.json) instead.

## Dependencies
Client libraries managed with npm.

### Live builds

There is no CI for now. To build live after uploading `src` files:

```bash
npm i
npm run build
```

Webpack'd output is placed in and served from `./web`.

## Requirements
* Node 14+ for build/dev

## Tests
Tests were removed in 2022.

## Apache virtual host configuration
Apache is no longer required for local development.
If you deploy to Apache and want HTML5-history routing, you’ll still need the equivalent rewrite rules.
