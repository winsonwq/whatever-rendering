#!/bin/sh

SRC_DIR=./src
PUBLIC_DIR=./public

concurrent -p pid --no-color \
  "babel -w ${SRC_DIR} -d lib" \
  "./scripts/partition-bundle-watch.sh" \
  "nodemon bin/www";
