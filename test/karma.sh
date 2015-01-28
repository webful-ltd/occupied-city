#!/bin/bash

BASE_DIR=`dirname $0`

karma start $BASE_DIR/../test/client/karma.conf.js $*
