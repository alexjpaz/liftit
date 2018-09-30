var Api = function(config) {
  var self = this;

  this.build = config.store.config.build;

  this.store = config.store;

  this.DateUtils = config.DateUtils;

  this.session = config.session;
};

module.exports = Api;
