import React from 'react';

import Calendar from './Calendar';

import { shallow } from 'enzyme';

describe('<Calendar />', () => {
  xit('should do a thing', () => {
    const wrapper = shallow((
      <Calendar  />
    ));

    expect(wrapper.html()).toContain('<div>March 2018</div>');
  });
});
