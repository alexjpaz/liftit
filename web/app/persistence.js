var persistence = function() {
};

persistence.inMemory = function() {
  this.get = noop;
  this.set = noop;
};

persistence.localStorage = function() {
  this.get = function(arg) {
    return JSON.parse(localStorage.getItem(arg));
  };
  this.set = function(arg, value) {
    localStorage.setItem(arg, JSON.stringify(value));
  };
};

persistence.composite = function() {
  this.get = function(arg) {
    persistence.localStorage.get(arg);
  };

  this.set = function(arg, value) {
    persistence.localStorage.set(arg, value);
  };
};

function noop() {}

module.exports = persistence;
