var Event = require('../../models/Event');
var DateUtils = require('../../date');

var LogAddController = function (tag) {
  this.copy = function(input) {
    return JSON.parse(JSON.stringify(self.vm));
  };

  this.isFutureLog = function() { 
    return DateUtils.isAfter(new Date(), tag.vm.date);
  };

  this.collectFutureEvents = function(date) {
    var events = Event.findAfter(date);

    return events;
  };

  this.rescheduleFutureEvents = function(currentEvent, originalDate, newDate) {
    var diff = DateUtils.difference(newDate, originalDate);

    var events = this.collectFutureEvents(originalDate);

    events = events
      .filter(function(event) {
        return event.key !== currentEvent.key
      })
      .map(function(event) {
      if(!event || !event.date) return;

      event.date = DateUtils.addDelta(event.date, diff);

      return event;
    });

    events.push(currentEvent);

    return events;
  };
};

module.exports = LogAddController;
