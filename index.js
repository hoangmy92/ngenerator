#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .command('init [name]', 'Initialize NodeJS app')
  .parse(process.argv);
