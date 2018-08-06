import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'

import { initFirebaseDatabaseRef } from './helpers';

export const FIREBASE_SYNC = 'FIREBASE_SYNC';
export const FIREBASE_READY = 'FIREBASE_READY';

export const firebaseSync = (snapshot) => ({
  type: FIREBASE_SYNC,
  val: snapshot.val()
})

export const firebaseReady = (firebase) => {
  return (dispatch) => {
    return dispatch({
      type: FIREBASE_READY,
      value: firebase
    });
  }
};

export const firebaseInit = (firebase) => {
  //console.log("%cfirebaseInit called: %c%o ", 'font-weight: bold; color: #a00', 'font-weight: none', firebase);
  return async (dispatch) => {
    const ref = await initFirebaseDatabaseRef(firebase);

    ref.on("value", (snapshot) => {
      store.dispatch(firebaseSync(snapshot));
    });

    firebaseReady(firebase); 
  };
};

export const reducer = (state, action) => {
  switch(action.type) {
    case FIREBASE_READY:
      return { ...state, 
        firebase: action.value,
      };
    case FIREBASE_SYNC:
      const val = action.val;
      let entries = [];

      if(val) {
        entries = Object.keys(val)
          .map(k => val[k]);
      }

      return {
        ...state,
        entries
      }
    default:
      return state;
  }
};

const defaultState = { entries: [] };

const store = createStore(
  reducer, 
  defaultState,
  applyMiddleware(thunk),
);

export default store;
