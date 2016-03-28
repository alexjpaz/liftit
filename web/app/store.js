var riot = require('riot');
var guid = require('./guid');

var dao = function(context, type) {
  this.list = function() {
    return Object.keys(context.events).map(function(k) {
      return context.events[k];
    }).filter(function(event) {
      return event.type === type;
    });
  };
};

var store = function(config, storage, reducer) {
  if(!storage) throw Error("Storage is not set");

  riot.observable(this);
  var self = this;

  this.config = config;

  this.events = storage.get('events') || {};

  this.guid = guid;

  this.on('addEvent', function(event) {
    event.updated = new Date().getTime();
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
  });

  this.on('digest', function() {
    self.trigger('reduce');
    self.trigger('persist');
  });

  this.trigger('digest');

  this.maxes = new dao(this, 'max');
  this.logs = new dao(this, 'log');
};


module.exports = store;
