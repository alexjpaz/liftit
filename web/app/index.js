require('file?name=[name].[ext]!./index.html')
require('file?name=[name].[ext]!./manifest.json')
require('file?name=[name].[ext]!./login.html')

var liftit = require('liftit-common');
var store = require('./store');
var settings = require('./config');
var persistence = require('./persistence');
var reducers = require('./reducers/index');
var DateUtils = require('./date');
var reducers = require('./reducers/index');
var DateUtils = require('./date');

var config = require('tojson!../config/index');
var Session = require('./services/session');

var app = require('./tags/app.tag');

var Api = require('./api');

var Store = require('./store');


var session = new Session(config);

var store = new Store(config, new persistence.localStorage(), new reducers, session);

var api = new Api({
  store: store,
  DateUtils: DateUtils,
  session: session
});

function Bootstrap() {
  session.create().then(function() {
    var opts = {
      api: api,
      views: {
        main: ''
      }
    };

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
    location.assign('/login.html');
  }).catch(function(err) {
    alert('Unhandled Exception!');
    console.error(err);
  });
}

Bootstrap();
