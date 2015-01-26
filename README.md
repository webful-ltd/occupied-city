Occupied City
=============
This is the codebase for occupied.city. It uses Symfony 2.6 on the server side and AngularJS 1.3 for the client.

Dependencies
------------
Server dependencies are managed with Composer and client libraries with Bower.

Requirements
------------
* PHP 5.4+
* MySQL 5.5+
* Apache 2.2.*

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
            RewriteRule ^/app_dev\.php/([a-z0-9]+)$ /app_dev.php/#!/$1 [R,L,NE]

            <Directory "/Users/noel/files/Dev/Occupied City/web">
                    Options Includes Indexes FollowSymLinks MultiViews
                    AllowOverride None
                    Order allow,deny
                    Allow from all
            </Directory>
    </VirtualHost>
