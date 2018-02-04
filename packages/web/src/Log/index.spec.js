import React from 'react';

import Log from './';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<Log />', () => {
  it('should render an named <input>', () => {
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Log onSubmit={onSubmit}/>
    ));

    expect(wrapper.html()).toContain('<input');
  });


  it('execute the onChange callback when changed', () => {
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Log onSubmit={onSubmit}/>
    ));

    wrapper.find('select[name="lift"]')
      .simulate('change', { target: { name: 'lift', value: 'press' } })

    wrapper.find('select[name="reps"]')
      .simulate('change', { target: { name: 'reps', value: '5' } })

    wrapper.find('input[name="weight"]')
      .simulate('change', { target: { name: 'weight', value: 100 } })

    wrapper.find('input[name="date"]')
      .simulate('change', { target: { name: 'date', value: "2017" } })

    expect(wrapper.state()).toEqual({ lift: 'press', reps: '5', date: "2017", weight: 100, type: 'log'});

    wrapper.find('.the-save-button')
      .simulate('click');

    expect(onSubmit).toHaveBeenCalled();
  });

  it('execute the onDelete callback when the delete button is clicked', () => {
    const onSubmit = jest.fn();
    const onDelete = jest.fn();
    const confirmDelete = () => true;
    const wrapper = mount((
      <Log onSubmit={onSubmit} onDelete={onDelete} confirmDelete={confirmDelete}/>
    ));

    wrapper.find('.the-delete-button')
      .simulate('click');

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

});
 
