const expect = require('chai').expect;
const Table = require('../../app/models/Table');

describe('model/Table', () => {
  it('should build a table', () => {
    var t = new Table({
      week: '1:1',
      weight: 315
    });
    expect(t.rows.length).to.equal(1);
    expect(t.rows[0].list[0]).to.equal(3);
  });

  it('should build a table with fractions', () => {
    var t = new Table({
      week: '3x5',
      weight: 370
    });
    expect(t.rows.length).to.equal(3);
    expect(t.rows[2].list[0]).to.equal(3);
  });
});


