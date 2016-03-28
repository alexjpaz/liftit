var DateUtils = {};

DateUtils.sort = function(a,b) {
    if(a.date > b.date) return -1;
    if(a.date == b.date) return 0;
    if(a.date < b.date) return 1;
};

DateUtils.string = function(date) {
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDay() + 1
    ].join('-');
};


DateUtils.before = function(date) {
};

DateUtils.create = function() {
  return new Date();
};

module.exports = DateUtils;
