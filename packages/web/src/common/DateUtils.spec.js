const expect = require('chai').expect;
const assert = require('chai').assert;
const date = require('./DateUtils');

describe("DateUtils", () => {
  it('should create a date', () => {
    var compareDate = new Date();
    var d = date.create();
    expect(d.slice(0,10)).to.equal(compareDate.toISOString().slice(0,10));
  });

  it('should create a date from a date', () => {
    var compareDate = new Date('2016-09-09');
    var d = date.create(compareDate);
    expect(d).to.equal(compareDate.toISOString());
  });

 it('should create a date from a string', () => {
    var compareDate = new Date('2016-08-08');
    var d = date.create('2016-08-08');
    expect(d).to.equal(compareDate.toISOString());
  });

  it('should compare same dates', () => {
    var a = new Date();
    var b = new Date();

    assert.isTrue(date.isSameDay(a,b));
    assert.isTrue(date.compare(a,b) === 0);
  });

  it('should compare past', () => {
    var past = new Date('2016-01-01');
    var present = new Date('2016-01-02');

    expect(date.isBefore(past,present)).to.equal(true);
    assert.isTrue(date.compare(past,present) === -1);
  });

  it('should compare strings', () => {
    var a = '2016-01-02';
    var b = '2016-01-02';

    assert.isTrue(date.isSameDay(a,b));
  });
});
