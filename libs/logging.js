var winston = require('winston');

module.exports = (function() {
  return new (winston.Logger)({
    colors    : {
      error : 'red',
      warn  : 'yellow',
      info  : 'green',
      debug : 'blue'
    },
    transports: [
      new winston.transports.Console({
        json        : false,
        colorize    : true,
        timestamp   : false,
        prettyPrint : true,
        formatter   : function(options) {
          return winston.config.colorize(options.level, '[' + options.level.toUpperCase() + ']') +
            ' ' + (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' +
            JSON.stringify(options.meta) : '');
        }
      })
    ],
    exceptionHandlers: [
      new winston.transports.Console({
        json      : false,
        timestamp : true
      })
    ],
    exitOnError: false
  })
}());
