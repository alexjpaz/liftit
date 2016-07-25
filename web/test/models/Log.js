var Ring = require('../../app/models/Ring');
var expect = require("chai").expect;

describe('models/Log', () => {
  it('find next log to create', () => {

    var a = new Ring([
      'press',
      'deadlift'
    ]);

    expect(a.next("press")).to.be.equal("deadlift");
    expect(a.next("deadlift")).to.be.equal("press");
  });
});
