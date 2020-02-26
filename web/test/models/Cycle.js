const Event = require('../../app/models/Event');
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

  it('should detect past,present,future cycles', () => {
    var today = '2016-02-02';
    var past = new Cycle({
      date: '2016-01-01'
    });

    expect(past.isPast(today)).to.equal(true);
  });

 it('should increment cycle lifts from another cycle', () => {
     let baseCycle = {
         press: 100,
         deadlift: 200,
         bench: 300,
         squat: 400
     };

     const newCycle = Cycle.nextCycleFrom(baseCycle);

     expect(newCycle.press).to.equal(baseCycle.press + 5);
     expect(newCycle.deadlift).to.equal(baseCycle.deadlift + 10);
     expect(newCycle.bench).to.equal(baseCycle.bench + 5);
     expect(newCycle.squat).to.equal(baseCycle.squat + 10);
 });

  it('should sort by date', () => {
    Event.setStore({
      "testLog1": {
        "key": "1",
        "type": "max",
        "date": "2016-01-01",
      },
      "testLog2": {
        "key": "2",
        "type": "max",
        "date": "2019-01-01",
      }
    });

    expect(Cycle.all()[0].key).to.equal("1");
    expect(Cycle.allSortedByDate()[0].key).to.equal("2");
  });

});
