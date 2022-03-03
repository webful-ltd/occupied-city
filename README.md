Occupied City
=============
This is the codebase for Occupied City. It uses AngularJS 1.8.

The site lives at **[occupied.city](https://occupied.city)** and is released as
[open source](https://github.com/webful-ltd/occupied-city) under the MIT Licence.

Issues
------
Issues are [tracked on GitHub](https://github.com/webful-ltd/occupied-city/issues).

Mapping
-------
We currently use [Leaflet](http://leafletjs.com/) for maps with
[angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive). Tiles come from the default
provider, OpenStreetMap.

### City outlines
We're using [Flickr Shapefiles](http://code.flickr.net/2011/01/08/flickr-shapefiles-public-dataset-2-0/) locality data
to produce approximate outlines for each included city. Currently the coordinates are manually copy/pasted from their
 GeoJSON file and included in our service data. Cities without a `coords` key will use their area and draw a circle
 instead of the real city shape.

Some of the resulting shapes are a slightly weird representation of the city, but I've not yet found a better data
source covering the whole world with enough detail to include cities the size of (say) Liverpool. It would be
good to stick to one consistent source and process for all cities. Do you know of a better place to get outline GeoJSON?
Let me know!

### Country outlines
As Flickr shapes were even more noticeably off for at least some countries, we use
[these approximations](https://github.com/johan/world.geo.json) instead.

Dependencies
------------
Client libraries managed with npm.

There is no CI for now. To build live after uploading `src` files:

    `npm i`
    `npm run build`

Webpack'd output is placed in and served from `./web`.

Requirements
------------
* Node 14+ for build
* Apache 2.4+

Tests
-----
Tests were few before and e2e's relied on the now-deprecated Protractor framework.

In the interests of keeping the app maintainable and secure in the medium term without burning hours on this, tests were therefore removed in 2022. We should write new ones if we want to do significant work on the app again.

Apache virtual host configuration
---------------------------------
To use 'HTML5 mode' requires a special vhost setup. This is
copied at build time from `src` and the path depends on
whether you use `build:dev` (currently hard-coded to Noel's
local file structure) or `build`.

Possible sources
----------------
Some potential sources for additional research & data:

* [Visualizing Palestine settlement infographic](http://visualizingpalestine.org/visuals/palestinian-israeli-peace-talks-settlements-oslo)
* [UNRWA Barrier Monitoring Unit](http://www.unrwa.org/newsroom/features/barrier-monitoring-unit?id=908) -
    We could show wall construction over time?
