var api = require('../api');

function Event() {
}

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

module.exports = Event;
