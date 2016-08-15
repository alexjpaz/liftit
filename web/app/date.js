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
  var ad = new Date(a).getTime();
  var bd = new Date(b).getTime();

  if(ad == bd) return 0;
  if(ad > bd) return 1;
  if(ad < bd) return -1;
};

DateUtils.isSameDay = function(a,b) {
  return DateUtils.compare(a,b) === 0;
};

DateUtils.isBefore = function(a,b) {
  return DateUtils.compare(a,b) == -1;
};

DateUtils.isAfter = function(a,b) {
  return DateUtils.compare(a,b) === -1;
};

DateUtils.create = function(from) {
  if(!from) {
    from = new Date();
  } else {
    from = new Date(from);
  }

  var date = new Date(from.toISOString().slice(0,10));
  return date.toISOString();
};

function pad(str) {
  var pad = "00"
  var ans = pad.substring(0, pad.length - str.length) + str
  return ans;
}

module.exports = DateUtils;
