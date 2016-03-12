var guid = require('./guid');

var store = function() {
  var self = this;

  this.aggregate = {};

  this.events = {};

  this.config = {
    selectReps: [1,2,3,4,5,6,8,9,10,11,12,13,14,15],
    selectLifts: ['press','deadlift','bench','squat']
  };

  this.digest = function(event) {
    this.aggregate.totalLogs = this.listByType('log').length;
  };

  this.load = function() {
    this.events = JSON.parse(localStorage.getItem('events')) || this.events;
    this.config = JSON.parse(localStorage.getItem('config')) || this.config;
  };

  this.persist = function() {
    localStorage.setItem('events', JSON.stringify(this.events));
    localStorage.setItem('config', JSON.stringify(this.config));
  };

  this.list = function() {
    return Object.keys(this.events).map(function(k) {
      return self.events[k];
    });
  };

  this.listByType = function(type) {
    return this.list().filter(function(event) {
      return event.type === type;
    });
  };
};

var s = new store();
s.load();
s.digest();

console.log(s.aggregate);

module.exports = s;
