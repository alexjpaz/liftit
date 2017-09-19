import React from 'react';

import Calendar from './';

import { shallow } from 'enzyme';

describe('<Calendar />', () => {
  it('should do a thing', () => {
    const wrapper = shallow((
      <Calendar name="foo" />
    ));

    expect(wrapper.html()).toContain('<p>foo</p>');
  });
});
