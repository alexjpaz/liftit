var api = require('../api');
var DateUtils = require('../date');
var guid = require('../guid');

var store = api.store.events; //TODO: use the setStoreFunction();

function Event() {
}

Event.setStore = function(newStore) {
  store = newStore;
};

Event.clone = function(event) {
  var clone = Object.assign({}, event);
  clone.key = guid();
  return clone;
};

Event.get = function(key) {
  return store[key];
};

Event.all = function() {
  return Object.keys(store).map(function(k) {
    return store[k];
  }).filter(Event.filters.active);
};

Event.findActive = function(filter) {
  return Event.all().filter(Event.filters.active).filter(filter);
};

Event.find = function(filter) {
  return Event.all().filter(filter);
};

Event.findActiveByType = function(type) {
  return Event.find(function(ev) {
    return ev.type === type && ev.disabled !== true;
  });
};

Event.findByType = function(type) {
  return Event.find(function(ev) {
    return ev.type === type;
  });
};

Event.findOn = function(date) {
  var filteredEvents = Event.all().filter(function(event) {
    return new Date(event.date).getTime() == new Date(date).getTime();
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findBetween = function(firstDate, secondDate) {
  var filteredEvents = Event.all().filter(function(event) {
    return new Date(event.date).getTime() >= new Date(firstDate).getTime() && new Date(event.date).getTime() <= new Date(secondDate).getTime();
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findBefore = function(date) {
  var filteredEvents = Event.all().filter(function(event) {
    return new Date(event.date).getTime() <= new Date(date).getTime();
  }).sort(DateUtils.sort);

  return filteredEvents;
};

Event.findAfter = function(date) {
  var filteredEvents = Event.all().filter(function(event) {
    return new Date(event.date).getTime() >= new Date(date).getTime();
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
