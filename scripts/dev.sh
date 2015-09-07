#!/bin/sh

SRC_DIR=./src
PUBLIC_DIR=./public

concurrent -p pid --no-color \
  "babel -w ${SRC_DIR} -d lib" \
  "watchify ${SRC_DIR}/client.js --im -o ${PUBLIC_DIR}/client.js";
