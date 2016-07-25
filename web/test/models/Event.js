var Event = require('../../app/models/Event');

var expect = require("chai").expect;

describe('models/Event', () => {

  beforeEach(() => {
    Event.setStore({});;
  });

  it('should clone a unique event', () => {
    var event = new Event();
    event.foo = 'bar';
    event.key = '111';

    var clonedEvent = Event.clone(event);

    expect(event).not.to.equal(clonedEvent);
    expect(event).not.to.deep.equal(clonedEvent);
    expect(event.foo).to.equal(clonedEvent.foo);
  });

  it('should get events from a store', () => {
    Event.setStore({
      dummy: 1,
      derp: 2
    });

    expect(Event.get('dummy')).to.equal(1);
    expect(Event.get('derp')).to.equal(2);
    expect(Event.get('invalid_key')).to.equal(undefined);
  });

  it('should get all active events from a store', () => {
    Event.setStore({
      one: {
        key: 'one',
      },
      two: {
        key: 'two',
      },
      three: {
        key: 'three',
        disabled: true
      }
    });

    expect(Event.all().length).to.equal(2);

    expect(Event.all()).to.deep.equal([{
      key: 'one'
    },{
      key: 'two'
    }]);
  });

  describe('date filtering', () => {
    beforeEach(() => {
      Event.setStore({
        one: {
          key: 'one',
          date: 'Mon Jul 25 2016 00:00:00 GMT-0400 (EDT)'
        },
        two: {
          key: 'two',
          date: 'Mon Jul 26 2016 00:00:00 GMT-0400 (EDT)'
        }
      });
    });
    it('should find an event on a specific date', () => {
      var events = Event.findOn('Mon Jul 25 2016 00:00:00 GMT-0400 (EDT)');
      expect(events.length).to.equal(1);
      expect(events[0].key).to.equal('one');

      var events = Event.findOn(new Date('Mon Jul 25 2016 00:00:00 GMT-0400 (EDT)'));
      expect(events.length).to.equal(1);
      expect(events[0].key).to.equal('one');
    });

    it('should find an event before a date', () => {
      var events = Event.findBefore('Mon Jul 26 2016 00:00:00 GMT-0400 (EDT)');
      expect(events.length).to.equal(2);
      expect(events[0].key).to.equal('two');
      expect(events[1].key).to.equal('one');
    });
    it('should find an event after a date', () => {
      var events = Event.findAfter('Mon Jul 24 2016 00:00:00 GMT-0400 (EDT)');
      expect(events.length).to.equal(2);
      expect(events[0].key).to.equal('two');
      expect(events[1].key).to.equal('one');
    });
    it('should find an event between a set of dates', () => {
      var events = Event.findBetween('Mon Jul 24 2016 00:00:00 GMT-0400 (EDT)', 'Mon Jul 26 2016 00:00:00 GMT-0400 (EDT)');
      expect(events.length).to.equal(2);
      expect(events[0].key).to.equal('two');
      expect(events[1].key).to.equal('one');
    });
  });
});
