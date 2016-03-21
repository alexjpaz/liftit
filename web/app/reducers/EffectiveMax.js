var DateUtils = require('../../app/date');

function EffectiveMax(events, currentDate) {
  checkInput(events, currentDate);

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

function checkInput(events, currentDate) {
 var valid = true;
  valid &= events nstanceof Array;

  if(!valid) {
    throw Error("Input must be an array of events");
  }
}

module.exports = function(state) {
  var lifts = 
  EffectiveMax;
};
