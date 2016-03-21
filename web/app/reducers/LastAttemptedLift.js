var LastAttemptedLift = function(events, lift) {

  //events.filter(function(event) {
    //return event.lift === lift;
  //});

  //return events[0];
  return 5;
};

module.exports = function(state) {
  state.lastAttemptedLift = {};
  state.config.lifts.forEach(function(lift) {
    state.lastAttemptedLift[lift] = LastAttemptedLift(state.events, lift);
  });
};
