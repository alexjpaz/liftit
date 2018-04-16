import React from 'react';

import { shallow } from 'enzyme';

import LiftTable from './LiftTable';

describe('<LiftTable />', () => {
  it('should render', () => {
    const wrapper = shallow((
      <LiftTable name="foo" />
    ));
  });
});


