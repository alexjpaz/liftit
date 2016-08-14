var liftit = require('liftit-common');

function Table(opts) {
  var table = {
    plates: liftit.config.plates,
    rows: []
  }

  liftit.config.weekMap[opts.week].forEach(function(w) {
    table.rows.push(liftit.plates(opts.weight * w));
  });

  return table;
}

Table.weekMap = liftit.config.weekMap;

module.exports = Table;
