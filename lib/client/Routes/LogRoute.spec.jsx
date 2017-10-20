import React from 'react';

import LogRoute from './LogRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<LogRoute />', () => {
  it('should render an named <input>', (done) => {
    const match = { params: 123 };
    const db = {
      allDocs: jest.fn(() => {
        return Promise.resolve({
          rows: [
            { 
              doc: {
                foo: "bar"
              }
            }
          ]
        });
      })
    };
    const history = jest.fn();
    const wrapper = mount(
      <LogRoute
        match={match} 
        db={db}
        history={history}
      />);

    setTimeout(() => {
      console.log(wrapper.html());
      expect(wrapper.html()).toContain("hi");
      done();
    },200); // There has to be a better way :(
  });
});
