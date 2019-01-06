const { expect } = require('chai');

const riot = require('riot');
const EventTag = require('../../app/tags/dashboard/event.tag');


describe('EventTag', () => {
  it('should render', () => {
    const e = {
      type: 'log'
    };

    const result = riot.render(EventTag, {
      e
    })

    expect(result).to.contain("event--log");
  });

  it('should render', () => {
    const e = {
      lift: 'press',
      type: 'log'
    };

    const result = riot.render(EventTag, {
      e
    })

    expect(result).to.contain("event--log");
    expect(result).to.contain("event--press");
  });
});
