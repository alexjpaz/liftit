var liftit = require('liftit-common');
var store = require('./store');
var settings = require('./config');
var persistence = require('./persistence');
var reducers = require('./reducers/index');
var DateUtils = require('./date');

var api = function(config) {
  var self = this;

  this.version = 1;

  this.store = new store(
    new settings(),
    new persistence.localStorage(),
    new reducers()
  );

  this.DateUtils = DateUtils;
};

module.exports = new api();
