const expect = require('chai').expect;
const date = require('../app/date');

describe("DateUtils", () => {
  it('should create a date', () => {
    var compareDate = new Date();
    var d = date.create();
    expect(d.slice(0,10)).to.equal(compareDate.toISOString().slice(0,10));
  });

  it('should create a date from a date', () => {
    var compareDate = new Date('2016-08-08');
    var d = date.create();
    expect(d).to.equal(compareDate.toISOString());
  });

 it('should create a date from a string', () => {
    var compareDate = new Date('2016-08-08');
    var d = date.create('2016-08-08');
    expect(d).to.equal(compareDate.toISOString());
  });
});
