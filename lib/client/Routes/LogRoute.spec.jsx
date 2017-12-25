import React from 'react';

import LogRoute from './LogRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<LogRoute />', () => {
  const createInstance = ({
    id
  }) => {
    return new Promise((resolve, reject) => {
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
          id={id}
          match={match} 
          db={db}
          history={history}
        />);

      setTimeout(() => {
        try {
          resolve({
            wrapper,
          })
        } catch(e) {
          reject(e);
        }
      }, 200); // There has to be a better way :(
    });
  };

  it('should render an components with the log form <Log />', () => {
    const id = `id-${new Date().getTime()}`;

    return createInstance({
      id,
    }).then(({wrapper}) => {
      const html = wrapper.html();
      expect(html).toContain(`LogRoute-${id}`);
      expect(html).toContain(`Log-${id}`);
    });
  });
});
