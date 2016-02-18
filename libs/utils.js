var logger = require('./logging');

module.exports = function() {
  function Utils() {

  }

  Utils.prototype.exitApp = exitApp;

  /**
   * Show error message and exit app
   * @param  {string} msg Error message
   */
  function exitApp(msg) {
    logger.error(msg);
    process.exit(1);
  }

  return new Utils();
}
