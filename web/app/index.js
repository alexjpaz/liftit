var index = require('file?name=[name].[ext]!./index.html')
var app = require('./tags/app.tag');

var mdl = require('material-design-lite');
var mdl = require('file?name=[name].[ext]!../node_modules/material-design-lite/material.min.css');

var api = require('./api');

var opts = {
  api: api,
  views: {
    main: ''
  }
}

riot.mount('*', opts);

riot.route('/logs', function(name) {
  opts.views.main = 'log-list';
});

riot.route('/logs/222', function(name) {
  opts.views.main = 'log-add';
});

riot.route.start(true);
