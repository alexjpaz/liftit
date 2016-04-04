var service = {
  list: list,
  effectiveMax: effectiveMax
};

function list(events, type) {
    return Object.keys(events).map(function(k) {
      return events[k];
    }).filter(function(event) {
      return event.type === type;
    });
}


var DateUtils = require('../../app/date');

function effectiveMax(events, currentDate) {
  events = list(events, 'max');

  if(currentDate instanceof Date) {
    currentDate = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDay() + 1
    ].join('-');
  }

  var result = null;
  var filteredEvents = events.filter(function(event) {
    var date = event.date
    return date <= currentDate;
  }).sort(DateUtils.sort);

  result = filteredEvents[0];


  return result;
};

module.exports = service;
