var Event = require('./Event');
var guid = require('../guid');
var DateUtils = require('../date');

function Cycle(event) {
  Event.call(this);

  this.key = guid();
  this.date = DateUtils.create();
  this.type = 'max';

  Object.assign(this, event);
}

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
