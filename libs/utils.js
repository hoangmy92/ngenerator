var logger = require('./logging');

module.exports = (function() {
  function Utils() {

  }

  Utils.prototype.exitApp = exitApp;

  /**
   * Show error message and exit app
   * @memberOf Utils
   * @param  {string} msg Error message
   * @example
   *   utils.exitApp();
   */
  function exitApp(msg) {
    logger.error(msg);
    process.exit(1);
  }

  return new Utils();
}());
