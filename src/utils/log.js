var bunyan = require('bunyan');
var logConfig = {
  name: 'app',
  streams: [
    { stream: process.stdout, level: 'info' }
    // { type: 'rotating-file', path: 'app.log', level: 'info', period: '1d', count: 10 }
  ]
};

var log = bunyan.createLogger(logConfig);

module.exports = { logConfig, log };
