var Event = require('./Event');
var guid = require('../guid');
var DateUtils = require('../date');
var config = require('../config');

function Cycle(event) {
  Event.call(this);

  this.date = DateUtils.create();
  this.type = 'max';
  this.key = guid();

  Object.assign(this, event);
}

Cycle.get = Event.get;
Cycle.clone = Event.clone;

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
  cloned.bench = +cloned.bench + 5;
  cloned.squat = +cloned.squat + 10;
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

Cycle.generateScedule = function(opts) {
  return Array(opts.repeat).fill(true).map(function(none, index) {
    var newDate = new Date(opts.cycle.date);
    newDate.setDate(newDate.getDate() + opts.cycleIncrement * (index));

    var row = {
      date: DateUtils.create(newDate),
    };

    opts.config.lifts.forEach(function(lift) {
      row[lift] = +opts.cycle[lift] + (opts.config.liftIncrement[lift] * (index+1));
    });

    var cycle = new Cycle(row);

    return cycle;
  });

}

Cycle.prototype.isPast = function(today) {
  if(!today) {
    today = DateUtils.create();
  }

  var result = DateUtils.compare(this.date, today);

  return result == -1;
};

Cycle.prototype.findNext = function() {
  var self = this;
  var cycles = Cycle.findAfter(this.date).filter(function(c) {
    return self.key !== c.key;
  }).reverse();

  var cycle = cycles[0];

  console.log(cycles);

  if(cycle && cycle.key !== this.key) {
    return cycle;
  }
};

Cycle.prototype.findPrevious = function() {
  var self = this;
  var cycles = Cycle.findBefore(this.date).filter(function(c) {
    return self.key !== c.key;
  });

  var cycle = cycles[0];

  if(cycle && cycle.key !== this.key) {
    return cycle;
  }
};

module.exports = Cycle;
