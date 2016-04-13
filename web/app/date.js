var moment = require('moment');

var DateUtils = {};

DateUtils.sort = function(a,b) {
    if(a.date > b.date) return -1;
    if(a.date == b.date) return 0;
    if(a.date < b.date) return 1;
};

DateUtils.string = function(date) {
    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDay() + 1)
    ].join('-');
};


DateUtils.before = function(date) {
};

DateUtils.create = function() {
  return DateUtils.string(new Date());
};

function pad(str) {
  return ('0'+str).substring(str.length);
}

module.exports = DateUtils;
