#!/bin/bash

BASE_DIR=`dirname $0`

$BASE_DIR/phpunit.sh;

$BASE_DIR/karma.sh;

$BASE_DIR/protractor.sh;
