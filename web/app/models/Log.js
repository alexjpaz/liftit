var guid = require('../guid');
var DateUtils = require('../date');

var Event = require('./Event');
var Cycle = require('./Cycle');

function Log(event) {
  Event.call(this);
  var self = this;
  this.key = guid();
  this.date = DateUtils.create();
  this.type = 'log';

  Object.assign(this, event);
}

Log.prototype.getEffectiveMax = function() {
  var cycles = Cycle.findBefore(this.date);

  var cycle = null;

  if(cycles) {
    cycle = cycles[0];
  }

  return cycle;
};

Log.all = function() {
  return Event.findByType('log');
};

module.exports = Log;
