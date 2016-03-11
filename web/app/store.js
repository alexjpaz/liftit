var riot = require('riot');
var guid = require('./guid');

var store = function() {
  riot.observable(this);
  var self = this;

  this.events = JSON.parse(localStorage.getItem('events')) || {};

  this.aggregates = {
    derp: 0
  };

  this.guid = guid;

  this.on('addEvent', function(event) {
    self.events[event.key] = event;
    self.trigger('digest');
  });

  this.on('removeEvent', function(eventKey) {
    delete self.events;
    self.trigger('digest');
  });

  this.on('persist', function() {
    localStorage.setItem('events', JSON.stringify(self.events));
  });

  this.on('aggregate', function() {
    var derp = 0;

    for( k in self.events) {
      var event = self.events[k];
      if(event.type === 'log') {
        derp = +derp + +event.weight;
        console.log('hi1', event);
      }
    }

    self.aggregates.derp = derp;

  });

  this.on('digest', function() {
    self.trigger('aggregate');
    self.trigger('persist');
  });

  this.trigger('digest');
};

module.exports = store;
