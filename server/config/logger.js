var winston = require('winston');

//
// Logging levels
//
var config = {
  colors: {
    info: 'green',
    debug: 'blue',
    error: 'red'
  }
};

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var level = config.loggerLevel;


var logger = module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: level,
      timestamp: true
    })
    //new (winston.transports.File)({ filename: 'logs/log.log', level: level })
  ],
  colors: config.colors
});
