import React from 'react';

import EntityRoute from './EntityRoute';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import firebase from '../firebase';

describe('<EntityRoute />', () => {
  const defaults = {
    history: jest.fn(),
    match: { params: 123 },
    firebaseDatabaseRef: firebase.database().ref("dummy")
  };

  const setupDb = (opts) => {
  };

  const createInstance = (opts) => {
    const { 
      id,
      history,
      firebaseDatabaseRef,
      match
    } = Object.assign({}, defaults, opts);

    return new Promise((resolve, reject) => {
      const wrapper = mount(
        <EntityRoute
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

  it('should not blow up by default', async () => {
    const wrapper = await createInstance({})
  });

  describe('views based on props', () => {
    it('should show the list view by default', () => {
      const ref = firebase.database().ref("dummy");
      ref.set({
        "foo": {"bar":"baz"}
      });
      return createInstance({
        firebaseDatabaseRef: ref
      }).then(({wrapper}) => {
        const state = wrapper.state();
        expect(state).toEqual({"list": [{"bar": "baz"}]});
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
      const data = {
        foo: 1
      };
      const ref = firebase.database().ref("dummy/some-id").set(data);
      return createInstance({
        match: {
          params: {
            id: "some-id"
          }
        }
      }).then(({wrapper}) => {
        const state = wrapper.state();
        expect(state).toEqual(data);
      });
    });

  });

  describe('updating', () => {
    it('should update the db instance when onSubmit is called', () => {
      const ref = firebase.database().ref("dummy/some-id");

      return createInstance({
        firebaseDatabaseRef: ref
      }).then(({wrapper}) => {
        const state = {
          _id: 'some-id', // TODO: this is required for some reason
          foo: new Date().getTime()
        };

        wrapper.instance().onSubmit(state);

        expect(ref.getData()['some-id']).toEqual(state);
      });
    });

    it('should create a new entity when the id is new', () => {
      const ref = firebase.database().ref("dummy/new-id-1");

      return createInstance({
        firebaseDatabaseRef: ref,
        match: { 
          params: {
            id: "new"
          }
        }
      }).then(({wrapper}) => {
        const state = {
          isNew: true,
          _id: 'new-id',
          foo: new Date().getTime()
        };
        wrapper.instance().onSubmit(state);
        expect(ref.getData()['new-id']).toEqual(state);
      });
    });

    it('should create a new entity with a generated id', () => {
      const ref = firebase.database().ref("dummy/new-id-7");

      return createInstance({
        firebaseDatabaseRef: ref,
        match: { 
          params: {
            id: "new"
          }
        }
      }).then(({wrapper}) => {
        const state = {
          isNew: true,
          foo: new Date().getTime()
        };
        wrapper.instance().onSubmit(state);
        // state now has a generated id
        expect(ref.getData()[state._id]).toEqual(state);
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing entity', async () => {
      const ref = firebase.database().ref("dummy/delete-me");
      ref.child('delete-me').set({
        _id: "delete-me",
        i_should_be_deleted: true
      });
      return createInstance({
        firebaseDatabaseRef: ref,
        match: { 
          params: {
            id: "delete-me"
          }
        }
      }).then(async ({wrapper}) => {
        const state = wrapper.state();
        expect(state.i_should_be_deleted).toEqual(true);

        await wrapper.instance().onDelete(state);

        expect(ref.getData()['delete-me']._deleted).toEqual(true);
      });

    });
  });
});
