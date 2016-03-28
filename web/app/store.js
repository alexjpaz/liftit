var riot = require('riot');
var guid = require('./guid');

var store = function(config, storage, reducer) {
  if(!storage) throw Error("Storage is not set");

  riot.observable(this);
  var self = this;

  this.config = config;

  this.events = storage.get('events') || {};

  this.guid = guid;

  this.on('addEvent', function(event) {
    event.updated = new Date().getTime();
    console.log(event)
    self.events[event.key] = event;
    self.trigger('digest');
  });

  this.on('removeEvent', function(eventKey) {
    delete self.events;
    self.trigger('digest');
  });

  this.on('persist', function() {
    storage.set('events', this.events);
  });

  this.on('reduce', function() {
    reducer.reduce(self);
    console.log(self)
  });

  this.on('digest', function() {
    self.trigger('reduce');
    self.trigger('persist');
  });

  this.trigger('digest');
};

module.exports = store;
