var index = require('file?name=[name].[ext]!./index.html')


var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

localStorage.setItem('apiKey', getParameterByName('apiKey'));



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


api.store.init(function() {
  riot.mount('*', opts);
  riot.route.exec();
});
