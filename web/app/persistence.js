var persistence = function() {
};

persistence.inMemory = function() {
  this.get = noop;
  this.set = noop;
};

persistence.localStorage = function() {
  this.get = function(arg) {
    return localStorage.getItem(arg);
  };
  this.set = function(arg, value) {
    localStorage.setItem(arg, value);
  };
};

function noop() {}

module.exports = persistence;
