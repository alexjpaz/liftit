var Event = require('./Event');
var guid = require('../guid');
var DateUtils = require('../date');

function Cycle(event) {
  Event.call(this);

  this.date = DateUtils.create();
  this.type = 'max';
  this.key = guid();

  Object.assign(this, event);
}

Cycle.nextCycleFrom = function(cycle) {
  var cloned = Event.clone(cycle);
  cloned.press = +cloned.press + 5;
  cloned.deadlift = +cloned.deadlift + 10;
  cloned.bench = +cloned.press + 5;
  cloned.squat = +cloned.press + 10;
  return cloned;
};

Cycle.all = function() {
  return Event.findByType('max');
};

Cycle.findBefore = function(date) {
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }

  var filteredEvents = Cycle.all().filter(function(event) {
    return event.date <= date;
  }).sort(DateUtils.sort);

  return filteredEvents;
};

module.exports = Cycle;
