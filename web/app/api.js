var liftit = require('liftit-common');
var store = require('./store');
var config = require('./config');
var persistence = require('./persistence');
var reducers = require('./reducers/index');

var api = function() {
  var self = this;

  this.version = 1;

  this.store = new store(
    new config(),
    new persistence.localStorage(),
    new reducers()
  );

};

module.exports = new api();
