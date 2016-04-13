var utils = require('./utils')

module.exports = function(state) {
  state.dashboard = {
    currentMax: utils.effectiveMax(state.events, new Date())
  };

  function logs() {
    return utils.list(state.events, 'log');
  }
};
