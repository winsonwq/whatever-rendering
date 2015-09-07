const express = require('express');
const path = require('path');
const app = express();
const logHelper = require('./utils/log');
const logger = require('express-bunyan-logger');
const compression = require('compression');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(logger(logHelper.logConfig));
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
