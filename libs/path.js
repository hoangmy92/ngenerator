var fs      = require('fs');
var fse     = require('fs-extra');
var Promise = require('bluebird');
var mkdirp  = require('mkdirp');
var path    = require('path');
var logger  = require('./logging');
var PathFactory;

module.exports = (function() {
  return new PathFactory();
}());

/**
 * Path factory
 */
function PathFactory() {
  // TODO: add public variables
}

PathFactory.prototype.createDir  = createDir;
PathFactory.prototype.createFile = createFile;
/**
 * Normalize path's format
 * @alias NodeJS.normalize
 */
PathFactory.prototype.normalize  = path.normalize;
/**
 * Join more pieces of path
 * @alias NodeJS.join
 */
PathFactory.prototype.join       = path.join;

/**
 * Create a directory
 * @memberOf PathFactory
 * @param  {String|Array} dirName Directory name
 * @return {Promise}      A promise to notify result
 * @example
 *   path.createDir('test');
 *   path.createDir(['test1', 'test2']);
 */
function createDir(dirName) {
  if (typeof dirName === 'string') {
    return Promise.promisify(mkdirp)(dirName);
  } else if (dirName instanceof Array) {
    return Promise.map(dirName, createDir);
  }
  return Promise.reject('Missing directory name');
}

/**
 * Create a file
 * @memberOf  PathFactory
 * @param  {String|Object} fileName File name or a set of files
 * @param  {string}        template A template for main file
 * @return {Promise}       A promise to notify result
 * @example
 *   path.createFile('test.txt');
 *   path.createFile({
 *     'test1.txt': '',                   // Blank file
 *     'test2.txt': './template/temp.txt' // test2.txt will be a copy of temp.txt
 *   });
 */
function createFile(fileName, template) {
  if (typeof fileName === 'string') {
    if ((typeof template !== undefined) && (template !== '')) {
      var ws = fs.createReadStream(path.join(__dirname, template)).pipe(fs.createWriteStream(fileName));
    }
    return Promise.promisify(fs.writeFile)(fileName, new Buffer(0));
  } else if (typeof fileName === 'object') {
    var files = Object.keys(fileName).filter(function(file) {
      return fileName.hasOwnProperty(file);
    });
    return Promise.map(files, function(file) {
      return createFile(file, fileName[file]);
    });
  }
}
