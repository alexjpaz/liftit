import React from 'react';

import {
  mapStateToProps
} from './CurrentCycleCard';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<CurrentCycleCard />', () => {
  xit('should mount', () => {
    mount(<CurrentCycleCard />)
  })
});

describe('mapStateToProps', () => {
  it('should not throw an exeception', () => {
    const states = [
      //undefined,
      //null,
      //[],
      {}
    ];

    states.forEach((state) => {
      try {
        mapStateToProps(state);
      } catch(err) {
        throw new Error("Could not map state: " + err);
      }
    });
  });

  it('should map props', () => {
    const state = {
      entries: [
        {}
      ],
    };
    const props = mapStateToProps(state);
  });
});
