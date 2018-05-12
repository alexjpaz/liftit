import React from 'react';

import LogRoute from './LogRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

let firebase = null;

describe('<LogRoute />', () => {
  let defaults = {};

  beforeEach(async () => {
    const { getFirebaseInstance } = await import('../firebase/index.js')
    const module  = await getFirebaseInstance();
    firebase = module.firebase;

    defaults = {
      history: jest.fn(),
      match: { params: 123 },
      firebaseDatabaseRef: firebase.database().ref("dummy"),
      initialState: {
        foo: {
          initial: true
        }
      }
    };
  });

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

  it('should create an entity', () => {
    const history = () => {};
    history.location = {
      search: '?from={"lift":"squat","weight":340,"reps":8}'
    };
    return createInstance({
      history,
      match: {
        params: {
          id: "new"
        }
      }
    }).then(({wrapper}) => {
      const state = wrapper.state();
      expect(state.isNew).toEqual(true);
      expect(state.type).toEqual('log');
      expect(state.weight).toEqual(340);
      expect(state.reps).toEqual(8);
    });
  });
});
