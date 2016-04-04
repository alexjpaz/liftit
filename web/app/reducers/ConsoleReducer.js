module.exports = function(state) {
  state.hi = {};
  state.config.lifts.forEach(function(lift) {
    state.hi[lift] = new Date();
  });
};
