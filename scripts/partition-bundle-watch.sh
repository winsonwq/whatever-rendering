#!/bin/sh

watchify -p [ partition-bundle --map .client-source-map.json --output ./public/entries --url /entries ] -o ./public/entries/temp.js
