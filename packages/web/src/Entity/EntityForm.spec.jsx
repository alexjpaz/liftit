import React from 'react';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import EntityForm from './EntityForm';

describe('<EntityForm />', () => {
  it('should for', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<EntityForm 
      onSubmit={onSubmit}
      />);
    const instance = wrapper.instance();
  });
});
