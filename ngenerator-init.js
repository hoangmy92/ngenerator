#!/usr/bin/env node

var program  = require('commander');
var util     = require('./libs/utils')();
var logger   = require('./libs/logging');
var path     = require('./libs/path')();
var nodeDirs = ['bin', 'config', 'logs', 'migrations', 'models', 'modules',
                'pulbic', 'routes', 'templates', 'test', 'view'];
var appName;

program.parse(process.argv);
(program.args.length && (appName = program.args[0]));

if (appName === undefined) {
  logger.error('Missing APP name');
  process.exit(1);
} else if (typeof appName !== 'string') {
  logger.error('App name must be a string');
  process.exit(1);
} else {
  // Create base directory
  path
    .createDir(appName)
    .then(function(name) {
      nodeDirs = nodeDirs.map(function(dir) {
        return path.join(appName, dir);
      });

      // Create all necessary sub-dir
      path
        .createDir(nodeDirs)
        .then(function() {
          // TODO: create file
        })
        .catch(util.exitApp);
    })
    .catch(util.exitApp);
}
