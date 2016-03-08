var index = require('file?name=[name].[ext]!./index.html')
var app = require('./tags/app.tag');

var mdl = require('material-design-lite');
var mdl = require('file?name=[name].[ext]!../node_modules/material-design-lite/material.min.css');

var api = require('./api');

riot.mount('*', {api: api});

