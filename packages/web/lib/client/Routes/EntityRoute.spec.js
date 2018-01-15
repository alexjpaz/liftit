import React from 'react';

import EntityRoute from './EntityRoute';

import PouchDB from 'pouchdb';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<EntityRoute />', () => {
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

  const setupDb = (opts) => {
    const db = new PouchDB(`/tmp/liftit.test.${new Date().getTime()}`); 

    return db;
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
        <EntityRoute
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
        put: jest.fn(),
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
          isNew: true,
          foo: 1
        };
        wrapper.instance().onSubmit(state);
        //expect(wrapper.state().isNew).not.toBeDefined();
        expect(db.put).not.toHaveBeenCalled;
        expect(db.post).toHaveBeenCalled;
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing entity', async () => {
      const db = setupDb();

      const entity = {
        _id: "123",
        foo: "bar"
      };

      await db.post(entity);

      const res = await db.get("123");

      return createInstance({
        db,
        match: { 
          params: {
            id: "123"
          }
        }
      }).then(async ({wrapper}) => {
        const state = wrapper.state();
        expect(state.foo).toEqual(entity.foo);
        const rsp = await wrapper.instance().onDelete(state);

        expect(rsp.ok).toEqual(true);

        try {
          await db.get("123");
          throw new Error("This should not find an entity");
        } catch(e) {
          // Everything is okay
        }
      });

    });
  });
});
