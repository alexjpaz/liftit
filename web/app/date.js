var DateUtils = {};

DateUtils.sort = function(a,b) {
    if(a.date > b.date) return -1;
    if(a.date == b.date) return 0;
    if(a.date < b.date) return 1;
};

DateUtils.string = function(date) {
    return [
      date.getFullYear(),
      pad(''+(date.getMonth() + 1)),
      pad(''+date.getDate())
    ].join('-');
};

DateUtils.compare = function(a,b) {
  if(a instanceof Date) {
    a = DateUtils.string(a);
  }

  if(b instanceof Date) {
    b = DateUtils.string(b);
  }

  console.log(a,b);
  debugger;
};

DateUtils.before = function(date) {
};

DateUtils.create = function() {
  return DateUtils.string(new Date());
};

function pad(str) {
  var pad = "00"
  var ans = pad.substring(0, pad.length - str.length) + str
  return ans;
}

module.exports = DateUtils;
