Occupied City
=============
This is the codebase for occupied.city. It uses Symfony 2.6 on the server side and AngularJS 1.3 for the client.
For now the server mostly just organises static resources and the site is largely an Angular app - we don't
yet make serious use of Symfony or use the database.

Issues
------
Will consider tracking these on Github if we proceed to open source this after the intial prototype is built. For
now here's a temporary list:

  1. Need initial AngularJS tests
  2. Cities should be drawn with something close to their actual outlines if at all possible

Mapping
-------
We currently use [Leaflet](http://leafletjs.com/) for maps with
[angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive). Tiles come from the default
provider, OpenStreetMap.

Dependencies
------------
Server dependencies are managed with Composer and client libraries with Bower.

Requirements
------------
* PHP 5.4+
* MySQL 5.5+
* Apache 2.2.*

AngularJS interpolation
-----------------------
Although little Twig interpolation is currently in use, to avoid confusion we give AngularJS the alternative
interpolation brackets `{[ ... ]}`. This allows AngularJS and Twig to be used side by side, e.g. in
`layout.html.twig`.

Apache virtual host configuration
---------------------------------
To use both Symfony and 'HTML5 mode' AngularJS routes (with no `#` prefix) requires an unusual vhost setup.

This is the one currently used for the local dev environment:

    <VirtualHost *:80>
            DocumentRoot "/Users/noel/files/Dev/Occupied City/web"
            ServerName oc.localhost
            ErrorLog "/Users/noel/files/Dev/Occupied City/app/logs/apache-errors.log"

            RewriteEngine on

            # Don't rewrite files or directories
            RewriteCond %{REQUEST_FILENAME} -f [OR]
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^ - [L]

            # Rewrite Angular routes to PHP index file to allow html5 state links
            RewriteRule ^/app_dev\.php/([a-zA-Z0-9]+)$ /app_dev.php/#!/$1 [R,L,NE]

            <Directory "/Users/noel/files/Dev/Occupied City/web">
                    Options Includes Indexes FollowSymLinks MultiViews
                    AllowOverride None
                    Order allow,deny
                    Allow from all
            </Directory>
    </VirtualHost>
