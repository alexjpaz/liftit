var utils = require('./utils')

module.exports = function(state) {
  state.dashboard = {
    heerrrp: utils.effectiveMax(state.events, new Date())
  };

  function logs() {
    return utils.list(state.events, 'log');
  }
};
