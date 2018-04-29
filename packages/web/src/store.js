import { createStore } from 'redux';

export const FIREBASE_SYNC = 'FIREBASE_SYNC';

export const firebaseSync = (snapshot) => ({
  type: FIREBASE_SYNC,
  val: snapshot.val()
})

const reducer = (state, action) => {
  switch(action.type) {
    case FIREBASE_SYNC:
      const val = action.val;

      const entries = Object.keys(val.local)
        .map(k => val.local[k]);

      return {
        ...state,
        entries
      }
      //return { ...state, ...val, ...entries }
    default:
      return state;
  }
};

const store = createStore(reducer, { entries: [] });

export default store;
