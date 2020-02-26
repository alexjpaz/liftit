const Event = require('../../app/models/Event');
const Log = require('../../app/models/Log');
var expect = require("chai").expect;

describe('models/Log', () => {
  beforeEach(() => {
    Event.setStore({});
  });
  it('find next log to create', () => {

    Event.setStore({
      "testCycle": {
        "date": "2016-01-01",
        "type": "max",
        "deadlift": 100
      },
      "testLog": {
        "key": "1",
        "type": "log",
        "date": "2016-01-01",
        "lift": "press",
      }
    });

    var log = Log.createNextLog('2016-01-02');
    expect(log.type).to.equal('log');
    expect(log.lift).to.equal('deadlift');
    expect(log.weight).to.equal(75);
    expect(log.reps).to.equal(11);
    expect(log.isGenerated).to.equal(true);
  });

  it('should sort by date', () => {
    Event.setStore({
      "testLog1": {
        "key": "1",
        "type": "log",
        "date": "2016-01-01",
        "lift": "press",
      },
      "testLog2": {
        "key": "2",
        "type": "log",
        "date": "2019-01-01",
        "lift": "press",
      }
    });

    expect(Log.all()[0].key).to.equal("1");
    expect(Log.allSortedByDate()[0].key).to.equal("2");
  });
});
