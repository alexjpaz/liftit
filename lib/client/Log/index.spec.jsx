import React from 'react';

import Log from './';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<Log />', () => {
  it('should render an named <input>', () => {
    const wrapper = shallow((
      <Log name="foo" />
    ));

    expect(wrapper.html()).toContain('<input');
  });


  it('execute the onChange callback when changed', () => {
    const onChange = jest.fn();
    const wrapper = mount((
      <Log onChange={onChange}/>
    ));

    wrapper.find('select[name="lift"]')
      .simulate('change', { target: { name: 'lift', value: 'press' } })

    wrapper.find('select[name="reps"]')
      .simulate('change', { target: { name: 'reps', value: '5' } })


    expect(wrapper.state()).toEqual({ lift: 'press', reps: '5'});


    expect(onChange).toHaveBeenCalled();
  });

});
 
