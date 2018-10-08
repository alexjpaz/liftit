const LogAddController = require('../../../app/tags/routes/log-add.js');

var Event = require('../../../app/models/Event');

var expect = require("chai").expect;

describe('LogAddController', () => {
  beforeEach(() => {
    Event.setStore({});;
  });

  it('should collect future events', () => {
    Event.setStore({
      foo1: { date: '2018-03-10' },
      foo2: { date: '2018-03-11' },
    });

    const controller = new LogAddController();

    const date = new Date("2018-03-01");
    const events = controller.collectFutureEvents(date);
    expect(events.length).to.eql(2);
  });

  it('should reschedule future events', () => {
    Event.setStore({
      foo1: { key: 'foo1', date: '2018-03-10' },
      foo2: { key: 'foo2', date: '2018-03-15' },
    });

    const controller = new LogAddController();

    const originalDate = new Date("2018-03-01");
    const newDate = new Date("2018-03-05"); // 4 days

    const currentEvent = { key: "bar", date: newDate };

    const events = controller.rescheduleFutureEvents(currentEvent, originalDate, newDate);
    expect(events.length).to.eql(3);

    // No order
    expect(events[0].key).to.eql("foo2");
    expect(events[1].key).to.eql("foo1");
    expect(events[2].key).to.eql("bar");

    expect(events[0].date.slice(0,10)).to.eql("2018-03-19");
    expect(events[1].date.slice(0,10)).to.eql("2018-03-14");
    expect(events[2].date).to.eql(newDate);
  });
});
