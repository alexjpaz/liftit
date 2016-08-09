var config = function() {
  this.lifts = [
    'press',
    'deadlift',
    'bench',
    'squat'
  ];

  this.liftIncrement = {
    press: 5,
    deadlift: 10,
    bench: 5,
    squat: 10
  };
};

var _instance = new config();

config.get = function() {
  return _instance;
};

module.exports = config;
