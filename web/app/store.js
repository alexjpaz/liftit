var riot = require('riot');
var guid = require('./guid');

var http = require('./services/http');
var ajax = http.ajax;

var dao = function(context, type) {
  this.list = function() {
    return Object.keys(context.events).map(function(k) {
      return context.events[k];
    }).filter(function(event) {
      return event.type === type;
    });
  };
};

var session = JSON.parse(localStorage.getItem('session'));

var cloud = {
  store: function(value, callback, failure) {
    return ajax('PUT', session.store.putUrl, value, callback, failure);

  },
  fetch: function(callback, failure) {
    return ajax('GET', session.store.getUrl, null, callback);
  }
};

var store = function(config, storage, reducer) {
  if(!storage) throw Error("Storage is not set");

  riot.observable(this);
  var self = this;

  this.config = config;

  this.events = /* storage.get('events') || */ {};

  this.guid = guid;

  this.init = function(callback, failure) {
   cloud.fetch(function(data) {
      self.events = data.events;
      self.config = data.config;
      self.trigger('digest');
      callback();
    });
  };

  this.on('clearEvents', function() {
    localStorage.setItem("events", "{}");
    self.events = {};
    self.trigger('digest');
  });

  this.on('addEvent', function(event) {
    event.updated = new Date().getTime();
    self.events[event.key] = event;
    self.trigger('digest');
  });

  this.on('removeEvent', function(eventKey) {
    delete self.events[eventKey];

    self.trigger('digest');
  });

  this.on('persist', function() {
    storage.set('events', this.events);
    cloud.store({
      events: this.events,
      config: this.config
    }, function(e) {
      self.trigger('persistSuccess', e);
    }, function(e) {
      self.trigger('persistFailure', e);
    });
  });

  this.on('reduce', function() {
    reducer.reduce(self);
  });

  this.on('digest', function() {
    self.trigger('reduce');
    self.trigger('persist');
  });


  this.maxes = new dao(this, 'max');
  this.logs = new dao(this, 'log');
};


module.exports = store;
