var liftit = require('liftit-common');
var store = require('./store');

var api = function() {
  var self = this;

  this.version = 1;

  this.store = new store()

};

module.exports = new api();
