var Api = function(config) {
  var self = this;

  this.build = config.store.config.build;

  this.store = config.store;

  this.DateUtils = config.DateUtils;
};

module.exports = Api;
