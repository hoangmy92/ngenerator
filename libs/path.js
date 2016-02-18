var fs      = require('fs');
var Promise = require('bluebird');
var mkdirp  = require('mkdirp');
var path    = require('path');
var logger  = require('./logging');
var PathFactory;

module.exports = function() {
  return new PathFactory();
};

function PathFactory() {
  //
}

PathFactory.prototype.createDir  = createDir;
PathFactory.prototype.createFile = createFile;
PathFactory.prototype.normalize  = path.normalize;
PathFactory.prototype.join       = path.join;

/** Function definition */
/**
 * Create a directory
 * @param  {String}   dirName Directory name
 * @param  {Function} cb      Callback function
 * @return {Promise}          A promise notify result
 */
function createDir(dirName) {
  return new Promise(function(resolve, reject) {
    if (typeof dirName === 'string') {
      mkdirp(dirName, function(err) {
        if (err) return reject(error);
        resolve(dirName);
      });
    } else if (dirName instanceof Array) {
      return Promise.map(dirName, createDir)
        .then(resolve)
        .catch(reject);
    } else {
      return reject('You didn\'t input any directory name');
    }
  });
}

function createFile() {

}
