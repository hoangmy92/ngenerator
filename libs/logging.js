var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      json      : false,
      colorize  : true,
      timestamp : false
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      json      : false,
      timestamp : true
    })
  ],
  exitOnError: false
});

module.exports = logger;
