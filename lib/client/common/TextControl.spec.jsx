import React from 'react';
import TextControl from './TextControl';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<TextControl />', () => {
  it('should render an named <input>', () => {
    const wrapper = shallow((
      <TextControl name="foo" />
    ));

    expect(wrapper.html()).toContain('name="foo"');
    expect(wrapper.html()).toContain('<input');
  });

  it('execute the onChange callback when changed', () => {
    const onChange = jest.fn();
    const wrapper = mount((
      <TextControl name="foo" onChange={onChange}/>
    ));

    wrapper.find('input[name="foo"]')
      .simulate('change', { target: { value: 'Hello' } })


    expect(onChange).toHaveBeenCalled();
  });
});
