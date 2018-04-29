import { createStore } from 'redux';

const firebasemock = require('firebase-mock');

let mockdatabase = null;

beforeEach(() => {
  mockdatabase = new firebasemock.MockFirebase();

  //mockdatabase.autoFlush();
});

it('should', () => {
  const app = (state={}, action) => {
    switch(action.type) {
      case 'SYNC': 
        return { ...state, ...action.val }
      default:
        return state;
    }
  }

  const store = createStore(app);

  mockdatabase.child("test").on('value', (snapshot) => {
    store.dispatch({ type: 'SYNC', val: snapshot.val() })
  });

  const val = { a: new Date().getTime() };

  mockdatabase.child("test").set(val)
  mockdatabase.flush();

  expect(store.getState()).toEqual(val);
});

