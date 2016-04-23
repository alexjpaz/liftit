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

var cloudUrl = 'https://b3gg00cbli.execute-api.us-east-1.amazonaws.com/prod/profile'

var ajax = function(method, url, data, callback) {
  callback = callback || function() {};
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('x-api-key', localStorage.getItem('apiKey') || "NONE");
  xhr.onload = function() {
    if(this.responseText && this.responseText.length > 0) {
      callback(JSON.parse(this.responseText));
    }
  };
  if(data) {
    data = JSON.stringify(data);
  }
  xhr.send(data);
};

var cloud = {
  store: function(value, callback) {
    return ajax('POST', cloudUrl, value, callback);
  },
  fetch: function(callback) {
    return ajax('GET', cloudUrl, null, callback);
  }
};

var store = function(config, storage, reducer) {
  if(!storage) throw Error("Storage is not set");

  riot.observable(this);
  var self = this;

  this.config = config;

  this.events = /* storage.get('events') || */ {};

  this.guid = guid;

  this.init = function(callback) {
   cloud.fetch(function(data) {
      self.events = data.events;
      self.config = data.config;
      self.trigger('digest');
      callback();
    });
  };

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
