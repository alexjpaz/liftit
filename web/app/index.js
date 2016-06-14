require('file?name=[name].[ext]!./index.html')
require('file?name=[name].[ext]!./manifest.json')
require('file?name=[name].[ext]!./login.html')

var session = require('./services/session');

var app = require('./tags/app.tag');
var api = require('./api');

session.create().then(function() {
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

  return api.store.init().then(function() {
    riot.mount('*', opts);
    riot.route.exec();

    api.store.on('persist', function() {
      window.onbeforeunload = function () {
        return "Warning! Data may not be saved. If you navigate away you may lose data!";
      };
    });

    api.store.on('persistSuccess', function() {
      window.onbeforeunload = null;
    });

  });
}, function(err) {
  console.log(err);
});
