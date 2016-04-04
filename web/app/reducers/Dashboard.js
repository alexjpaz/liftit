module.exports = function(state) {
  state.dashboard = {
    foo: 10,
    derp: logs()
  };

  function logs() {
    return state.logs.list();
  }
};
