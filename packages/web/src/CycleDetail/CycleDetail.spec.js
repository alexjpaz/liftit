import React from 'react';

import CycleDetail from './';

import { 
  mount,
  shallow
} from 'enzyme';

describe('CycleDetail', () => {
  it('should mount', () => {
    shallow(<CycleDetail />);
  });

  it('should generate a table', () => {
    const log = {
      type: 'log',
      lift: 'press',
      weight: 85
    };
    const wrapper = mount(<CycleDetail 
      cycle={{
        type: 'cycle',
        date: '2018-01-01', 
        press: 100,
      }}
      logs={[log]}
      />);

    const table = wrapper.instance().generateTable();
    expect(table.press['85']).toEqual(log);

    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('.table').length).toEqual(1);
  });

  it('should generate a table and have unique cells', () => {
    // This is a test to ensure that the "key" property is set correctly 
    // in the dom tree and the table displays correctly
    //
    const log = {
      type: 'log',
      lift: 'press',
      weight: 85
    };
    const wrapper = mount(<CycleDetail 
      cycle={{
        type: 'cycle',
        date: '2018-01-01', 
        press: 100,
      }}
      logs={[log]}
      />);

    const table = wrapper.instance().generateTable();
    expect(table.press['85']).toEqual(log);

    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('.table').length).toEqual(1);
    expect(wrapper.find('.fas').length).toEqual(12);
    expect(wrapper.find('.fas.fa-check').length).toEqual(1);
  });
});
