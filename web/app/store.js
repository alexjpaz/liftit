var riot = require('riot');
var guid = require('./guid');

var http = require('./services/http');
var ajax = http.ajax;

var session = JSON.parse(localStorage.getItem('session'));

var cloud = {
  store: function(value, callback, failure) {
    return ajax('PUT', session.store.putUrl, value, callback, failure);

  },
  fetch: function(callback, failure) {
    return ajax('GET', session.store.getUrl, null, function(data) {
      if(new Date(localStorage.getItem('lastUpdated')).getTime() > new Date(data.lastUpdated).getTime()) {

        console.error('Warning: updated timestamp on local device is new than the remote server! Please reload');
        setTimeout(function() {
          window.location.reload();
        },1000);
      } else {
        callback(data);
      }
    });
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

  this.on('updateEvents', function(events) {
    if(events instanceof Array === false) {
      events = [events];
    }

    events.forEach(function(event) {
      event = Object.assign({}, event);
      event.updated = new Date().getTime();
      self.events[event.key] = event;
    });

    self.events = Object.assign({}, self.events);

    self.trigger('digest');
  });

  this.on('persist', function() {
    var lastUpdated = new Date();
    storage.set('events', this.events);
    cloud.store({
      events: this.events,
      config: this.config,
      lastUpdated: lastUpdated
    }, function(e) {
      self.trigger('persistSuccess', e);
      localStorage.setItem('lastUpdated', lastUpdated);
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
};

module.exports = store;
