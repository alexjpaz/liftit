var api = require('../api');
var DateUtils = require('../date');
var guid = require('../guid');

function Event() {
}

Event.clone = function(event) {
  var clone = Object.assign({}, event);
  clone.key = guid();
  return clone;
};

Event.get = function(key) {
  return api.store.events[key];
};

Event.all = function() {
  return Object.keys(api.store.events).map(function(k) {
    return api.store.events[k];
  }).filter(Event.filters.active);
};

Event.find = function(filter) {
  return Event.all().filter(filter);
};

Event.findByType = function(type) {
  return Event.find(function(ev) {
    return ev.type === type;
  });
};

Event.findOn = function(date) {
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }

  var filteredEvents = Event.all().filter(function(event) {
    return event.date == date;
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findBetween = function(firstDate, secondDate) {
  if(firstDate instanceof Date) {
    firstDate = DateUtils.string(firstDate);
  }

  if(secondDate instanceof Date) {
    secondDate = DateUtils.string(secondDate);
  }

  var filteredEvents = Event.all().filter(function(event) {
    return event.date >= firstDate && event.date <= secondDate;
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findBefore = function(date) {
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }

  var filteredEvents = Event.all().filter(function(event) {
    return event.date <= date;
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findAfter = function(date) {
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }

  var filteredEvents = Event.all().filter(function(event) {
    return event.date >= date;
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.filters = {};

Event.filters.active = function(event) {
  if(event) {
    return event.disabled !== true;
  }
};

module.exports = Event;
