import React from 'react';

import Workbook from './Workbook';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<Workbook />', () => {
  it('should mount', () => {
    mount(<Workbook />)
  })
}); 
