import React from 'react';

import LogRoute from './LogRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import firebase from '../firebase';

describe('<LogRoute />', () => {
  const defaults = {
    history: jest.fn(),
    match: { params: 123 },
    firebaseDatabaseRef: firebase.database().ref("dummy"),
    initialState: {
      foo: {
        initial: true
      }
    }
  };

  const createInstance = (opts) => {
    const { 
      id,
      history,
      firebaseDatabaseRef,
      initialState,
      match
    } = Object.assign({}, defaults, opts);

    firebaseDatabaseRef.set(initialState);

    return new Promise((resolve, reject) => {
      const wrapper = mount(
        <LogRoute
          id={id}
          match={match} 
          firebaseDatabaseRef={firebaseDatabaseRef}
          history={history}
        />);

      const instance = wrapper.instance();

      setTimeout(() => {
        try {
          resolve({
            wrapper,
            instance
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
