#!/bin/sh

SRC_DIR=./src
PUBLIC_DIR=./public

#
# stylus => css
mkdir -p ${PUBLIC_DIR}/styles;
stylus -u nib -u jeet --include-css ${SRC_DIR}/client.styl -o ${PUBLIC_DIR}/styles/client.css && sqwish ${PUBLIC_DIR}/styles/client.css -o ${PUBLIC_DIR}/styles/client.css

#
# js => browserify
./scripts/partition-bundle.sh

#
# js => babel in express
babel ${SRC_DIR} -d lib
