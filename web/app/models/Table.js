var liftit = require('liftit-common');

function Table(opts) {
  var table = {
    plates: liftit.config.plates,
    rows: []
  }

  liftit.config.weekMap[opts.week].forEach(function(w) {
    var row = {
      weight: liftit.roundTo(opts.weight * w, 5),
      fraction: w
    };
    row = Object.assign(row, liftit.plates(row.weight));
    table.rows.push(row);
  });


  return table;
}

Table.weekMap = liftit.config.weekMap;

module.exports = Table;
