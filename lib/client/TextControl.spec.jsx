import React from 'react';
import TextControl from './TextControl';

import { shallow } from 'enzyme';

describe('<TextControl />', () => {
  it('test', () => {
    const wrapper = shallow((
      <TextControl />
    ));
    expect(wrapper.contains(<div>foo</div>)).toEqual(true);
  });
});
