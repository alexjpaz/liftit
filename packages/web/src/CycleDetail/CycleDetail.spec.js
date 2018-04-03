import React from 'react';

import CycleDetail from './';

import { 
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
    const wrapper = shallow(<CycleDetail 
      cycle={{
        type: 'cycle',
        date: '2018-01-01', 
        press: 100,
      }}
      logs={[log]}
      />);

    const table = wrapper.instance().generateTable();
    expect(table.press['85']).toEqual(log);
  });
});
