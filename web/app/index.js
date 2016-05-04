var index = require('file?name=[name].[ext]!./index.html')
var login = require('file?name=[name].[ext]!./login.html')

var session = require('./services/session');

var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

if(getParameterByName('apiKey')) {
  localStorage.setItem('apiKey', getParameterByName('apiKey'));
}


session.create(function() {
  var app = require('./tags/app.tag');

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


    api.store.on('persist', function() {
      window.onbeforeunload = function () {
        return "Warning! Data may not be saved. If you navigate away you may lose data!";
      };
      console.log(window.onbeforeunload)
    });


    api.store.on('persistSuccess', function() {
      window.onbeforeunload = null;
    });

  });
});
