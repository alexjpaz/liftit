var LastAttemptedLift = require('../../app/reducers/LastAttemptedLift');

var expect = require('chai').expect;

xdescribe('reduces/LastAttemptedLift', function() {
 it('should should find the last attempted lift', function() {
   var events = [
      { date: "2015-01-01", lift: 'press', id: 1 },
      { date: "2015-01-02", lift: 'press', id: 2 },
      { date: "2015-01-03", lift: 'bench', id: 3 }
    ];

    var result = LastAttemptedLift(events, 'press', '2015-01-05');
    expect(result.id).equal(2);
  });
});
