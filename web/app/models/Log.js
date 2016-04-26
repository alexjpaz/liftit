var guid = require('../guid');
var DateUtils = require('../date');

var Event = require('./Event');
var Cycle = require('./Cycle');

var liftit = require('liftit-common');

function Log(event) {
  Event.call(this);
  var self = this;
  this.key = guid();
  this.date = DateUtils.create();
  this.type = 'log';
  this.weight = null;
  this.reps = null;

  Object.assign(this, event);
}

Log.prototype.getEffectiveMax = function() {
  var cycles = Cycle.findBefore(this.date);

  var cycle = null;

  if(cycles) {
    cycle = cycles[0];
  }

  if(!cycle) {
    cycle = new Cycle();
  }

  return cycle;
};

Log.findBefore = function(date) {
  return Event.findBefore(date).filter(function(e) {
    return e.type === 'log';
  });
};


Log.prototype.getEffectiveMaxWeight = function() {
  return this.getEffectiveMax()[this.lift];
};

Log.prototype.getWork = function() {
  return liftit.max(+this.weight, +this.reps);
};

Log.prototype.getRepGoal = function() {
  return liftit.repgoal(this.getEffectiveMax()[this.lift], this.weight);
};

Log.prototype.getRepsToMax = function() {
  return liftit.repsToMax(this.getEffectiveMaxWeight(), this.weight);
};


Log.prototype.getLastAttempt = function() {
  return Log.findBefore(this.date).reps;
};

Log.all = function() {
  return Event.findByType('log');
};

module.exports = Log;
