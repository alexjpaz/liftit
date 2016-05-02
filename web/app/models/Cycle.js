var Event = require('./Event');
var Log = require('./Log.js');
var guid = require('../guid');
var DateUtils = require('../date');

function Cycle(event) {
  Event.call(this);

  this.date = DateUtils.create();
  this.type = 'max';
  this.key = guid();

  Object.assign(this, event);
}

Cycle.get = Event.get;

Cycle.findLogs = function(cycle) {
  var futureDate = new Date();

  var futureCycle = Event.findAfter(cycle.date);

  if(futureCycle.length > 0) {
    futureDate = futureCycle[0];
  }


  return Event.findBetween(cycle.date, futureDate).filter(function(e) {
    return e.type === 'log';
  });
};

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

Cycle.findAfter = function(date) {
  console.log(11111111111111, date)
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }


  var filteredEvents = Cycle.findSorted(function(event) {
    return event.date >= date;
  });

  return filteredEvents;
};

Cycle.findSorted = function(filter) {
  if(!filter) {
    filter = function(event) {
      return true;
    };
  }
  return Cycle.all().filter(filter).sort(DateUtils.sort);
};


Cycle.removeAll = function(cycles) {
}


module.exports = Cycle;
