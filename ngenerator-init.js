#!/usr/bin/env node

var program  = require('commander');
var kernel   = require('./libs/core');
var util     = require('./libs/utils');
var path     = require('./libs/path');

(function() {
  var appName;

  program.parse(process.argv);
  (program.args.length && (appName = program.args[0]));

  if (appName === undefined) {
    kernel.logger.error('Missing APP name');
    process.exit(1);
  } else {
    kernel
      .initBase(appName)
      .then(function() {
        return kernel.generatePath(appName);
      })
      .then(function(dirs) {
        // Generate source successfully
        // TODO: remove generated directory
      })
      .catch(function(err) {
        kernel.logger.error(err);
      });
  }
}());
