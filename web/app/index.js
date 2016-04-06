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

riot.route.start(true);

riot.mixin('api', {
  api: api
});

riot.mixin('store', {
  store: api.store
});

riot.mixin('forms', {

});



riot.mount('*', opts);
