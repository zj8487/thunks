'use strict';
/*global console*/

var Thunkjs = require('../thunk.js');
var fs = require('fs');
var Thunk = Thunkjs(function (error) { console.error('Thunk error:', error); });

Thunk.
  all(['examples/demo.js', 'thunk.js', '.gitignore'].map(function (path) {
    return Thunk(function (callback) { fs.stat(path, callback); });
  }))(function (error, result) {
    console.log('Success: ', result);
    return Thunk(function (callback) { fs.stat('none.js', callback); });
  })(function (error, result) {
    console.error('This should not run!', error);
  });
