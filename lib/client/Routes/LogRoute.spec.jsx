import React from 'react';

import LogRoute from './LogRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<LogRoute />', () => {
  const defaults = {
    history: jest.fn(),
    match: { params: 123 },
    db: {
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
    }
  };

  const createInstance = (opts) => {
    const { 
      id,
      history,
      db,
      match
    } = Object.assign({}, defaults, opts);

    return new Promise((resolve, reject) => {
      const wrapper = mount(
        <LogRoute
          id={id}
          match={match} 
          db={db}
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


  describe('initial state', () => {
    it('should show the list view by default', () => {
      return createInstance({
      }).then(({wrapper}) => {
        const state = wrapper.state();
        expect(state).toEqual({"list": [{"foo": "bar"}]});
      });
    });

    it('should createNewEntity when id is "new"', () => {
      return createInstance({
        match: {
          params: {
            id: "new"
          }
        }
      }).then(({wrapper}) => {
        const state = wrapper.state();
        expect(state.isNew).toEqual(true);
      });
    });

    it('should call get when there is an id in the url', () => {
      return createInstance({
        db: {
          get: jest.fn(async () => {
            return await {
              foo: 1
            };
          })
        },
        match: {
          params: {
            id: "some-id"
          }
        }
      }).then(({wrapper}) => {
        const state = wrapper.state();
        expect(state.foo).toEqual(1);
      });
    });

  });

  describe('updating', () => {
    it('should update the db instance when onSubmit is called', () => {
      const db = {
        allDocs: defaults.db.allDocs,
        put: jest.fn()
      };

      return createInstance({
        db
      }).then(({wrapper}) => {
        const state = {
          foo: 1
        };
        wrapper.instance().onSubmit(state);
        expect(db.put).toHaveBeenCalledWith(state);
      });
    });
    it('should create a new entity when the id is new', () => {
      const db = {
        allDocs: defaults.db.allDocs,
        post: jest.fn()
      };

      return createInstance({
        db,
        match: { 
          params: {
            id: "new"
          }
        }
      }).then(({wrapper}) => {
        const state = {
          foo: 1
        };
        wrapper.instance().onSubmit(state);
        expect(wrapper.state().isNew).not.toBeDefined();
        expect(db.post).toHaveBeenCalled;
      });
    });
  });
});
