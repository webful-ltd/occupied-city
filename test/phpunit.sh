#!/bin/sh

BASE_DIR=`dirname $0`

$BASE_DIR/../vendor/phpunit/phpunit/phpunit -c $BASE_DIR/../app
