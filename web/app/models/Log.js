var guid = require('../guid');
var DateUtils = require('../date');

var Event = require('./Event');
var Ring = require('./Ring');
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

  return cycle;
};

Log.createNextLog = function(today) {
  var nextLog = new Log({
    date: today
  });

  var previousLog = Log.findBefore(today);

  if(!previousLog[0]) {
    return nextLog;
  }

  previousLog = new Log(previousLog[0]);

  var effectiveMax = previousLog.getEffectiveMax();
  var nextEffectiveMax =  nextLog.getEffectiveMax();

  var liftRing = new Ring([
    'press',
    'deadlift',
    'bench',
    'squat'
  ]);

  var weightFractionRing = new Ring([
    0.75,
    0.85,
    0.95
  ]);

  var nextLift = liftRing.next(previousLog.lift);

  var previousFraction = liftit.roundTo(+previousLog.weight / +effectiveMax[nextLift], 0.05);

  var nextWeight = liftit.roundTo(weightFractionRing.next(previousFraction) * nextEffectiveMax[nextLift], 5);

  nextLog.lift = nextLift;
  nextLog.weight = nextWeight
  nextLog.reps = nextLog.getRepGoal();

  return nextLog;
};

Log.findBefore = function(date) {
  return Event.findBefore(date).filter(function(e) {
    return e.type === 'log';
  });
};

Log.all = function() {
  return Event.findByType('log');
};

Log.findBetween = function(start, end) {
  return Event.findBetween(start, end).filter(function(e) {
    return e.type === 'log';
  });
}

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

module.exports = Log;
