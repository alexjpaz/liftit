var EffectiveMax = require('../../app/reducers/EffectiveMax');

var expect = require('chai').expect;

xdescribe('reduces/EffectiveMax', function() {
  it('should throw an error when there is invalid input', function() {
    EffectiveMax([]);
  });

 it('should should find the ', function() {
   var events = [
      { date: "2015-01-01", id: 1 },
      { date: "2015-01-02", id: 2 },
      { date: "2015-01-03", id: 3 }
    ];

    var result = EffectiveMax(events, "2015-01-05");
    expect(result.id).equal(3);
  });
});
