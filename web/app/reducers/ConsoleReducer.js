module.exports = function(state) {
  console.log('hiaaa',state);

  state.hi = {};
  state.config.lifts.forEach(function(lift) {
    state.hi[lift] = new Date();
  });
};
