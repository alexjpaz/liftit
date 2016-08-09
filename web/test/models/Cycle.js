const Cycle = require('../../app/models/Cycle');
const config = require('../../app/config');
const expect = require("chai").expect;

describe('models/Cycle', () => {
  it('should generate schedule', () => {
    var templateCycle = new Cycle();
    templateCycle.date = '2016-01-01T00:00:00.000Z';
    templateCycle.press = 5;
    templateCycle.deadlift = 5;
    templateCycle.bench = 5;
    templateCycle.squat = 5;

    var schedule = Cycle.generateScedule({
      repeat: 5,
      cycleIncrement: 30,
      cycle: templateCycle,
      config: new config()
    });

    expect(schedule.length).to.equal(5);

    expect(schedule[0].press).to.equal(10);
    expect(schedule[0].deadlift).to.equal(15);
    expect(schedule[0].date).to.equal('2016-01-01T00:00:00.000Z');
    expect(schedule[1].date).to.equal('2016-01-31T00:00:00.000Z');

  });
});
