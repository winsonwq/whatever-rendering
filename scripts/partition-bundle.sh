#!/bin/sh

browserify -p [ partition-bundle --map .client-source-map.json --output ./public/entries --url /entries ] --im
