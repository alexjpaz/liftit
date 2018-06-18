import { createStore } from 'redux';

export const FIREBASE_SYNC = 'FIREBASE_SYNC';

export const firebaseSync = (snapshot) => ({
  type: FIREBASE_SYNC,
  val: snapshot.val()
})

export const reducer = (state, action) => {
  switch(action.type) {
    case FIREBASE_SYNC:
      const val = action.val;
      let entries = [];

      if(val) {
        entries = Object.keys(val.local)
          .map(k => val.local[k]);
      }

      return {
        ...state,
        entries
      }
    default:
      return state;
  }
};

const store = createStore(reducer, { entries: [] });

export default store;
