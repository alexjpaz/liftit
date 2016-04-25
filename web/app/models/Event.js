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

Event.all = function() {
  return Object.keys(api.store.events).map(function(k) {
    return api.store.events[k];
  });
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

Event.findBefore = function(date) {
  if(date instanceof Date) {
    date = DateUtils.string(date);
  }

  var filteredEvents = Event.all().filter(function(event) {
    return event.date <= date;
  }).sort(DateUtils.sort);

  return filteredEvents;
};


module.exports = Event;
