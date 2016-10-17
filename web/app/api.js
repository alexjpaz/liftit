var Api = function(config) {
  var self = this;

  this.version = 1.1;

  this.store = config.store;

  this.DateUtils = config.DateUtils;
};

module.exports = Api;
