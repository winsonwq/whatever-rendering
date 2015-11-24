#!/bin/sh

SRC_DIR=./src
PUBLIC_DIR=./public

mkdir -p ${PUBLIC_DIR}/styles;

concurrent -p pid --no-color \
  "babel -w ${SRC_DIR} -d lib" \
  "./scripts/stylus-bundle-watch.sh" \
  "./scripts/partition-bundle-watch.sh";
