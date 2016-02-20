var fs      = require('fs');
var program = require('commander');
var nconf   = require('nconf');
var Promise = require('bluebird');
var logging = require('./logging');
var path    = require('./path');

/**
 * @contructor KernelFactory
 * @author MyTruong(hoangmy92@gmail.com)
 */
function KernelFactory() {
  this.config = nconf;
  this.logger = logging;
  this.getConfig();
}

KernelFactory.prototype.init         = init;
KernelFactory.prototype.getConfig    = getConfig;
KernelFactory.prototype.initBase     = initBase;
KernelFactory.prototype.parsePath    = parsePath;
KernelFactory.prototype.generatePath = generatePath;

/** Function definitions */

/**
 * Initialize app
 * @memberOf KenelFactory
 * @example
 *   kernel.init();
 */
function init() {
  program
    .version('0.0.1')
    .command('init [name]', 'Initialize NodeJS app')
    .parse(process.argv);
}

/**
 * Get default configuration
 * @memberOf KenelFactory
 * @example
 *   kernel.getConfig();
 */
function getConfig() {
  this.config.file('path','./config/path.json');
}

/**
 * Get list files and directories from mixins
 * @param  {Object} listPaths Mixins files and directories
 * @param  {String} rootPath  Root path
 * @return {Object}           List of files and directories
 * @example
 *   var listPaths = {
 *     "config": {},                              // Empty directory
 *     "views" : {
 *       "index.html": "./templates/index.html",  // File with its template
 *       "home.html" : ""                         // Empty file
 *     }
 *   };
 *   kernel.parsePath(listPaths, 'yourRootPath');
 */
function parsePath(listPaths, rootPath) {
  var list = {
    dirs  : [],
    files : {}
  };

  recursivePath(listPaths, rootPath);
  return list;

  /**
   * Recursive to get list of files and directories
   * @param  {Object} mixins List of mixins files and directoris
   * @param  {String} root   Root path
   * @return {Object}        List of files and directories
   */
  function recursivePath(mixins, root) {
    for (var key in mixins) {
      if (mixins.hasOwnProperty(key)) {
        if (typeof mixins[key] === 'object') {
          var newRoot = path.join(root, key);
          list['dirs'].push(newRoot);
          recursivePath(mixins[key], newRoot);
        } else {
          list['files'][path.join(root, key)] = mixins[key];
        }
      }
    }
  }
}

function generatePath(rootPath) {
  var paths;

  paths = this.parsePath(this.config.get('path:default'), rootPath);

  return new Promise.all([
    path.createDir(paths['dirs']),
    path.createFile(paths['files'])
  ]);
}

/**
 * Create new NodeJS application's directory
 * @param  {String} appName Name of your new app
 * @return {Object}         A promise result
 */
function initBase(appName) {
  return new Promise
    .promisify(fs.lstat)(appName)
    .then(function() {
      return Promise.reject('"' + appName + '" is already exist.');
    }, function(err) {
      return path.createDir(appName);
    });
}

module.exports = (function() {
  return new KernelFactory();
})();
