import store, {
  FIREBASE_SYNC,
  reducer
} from './store';


describe('store', () => {
  it('should ignore bad actions', () => {
    store.dispatch({ type: 'FAKE' });
    const state = store.getState();
    expect(state).toEqual({ entries: [] });
  });

  it('should sync values', () => {
    const val = {
      local: { // WEIRD that we have to do this
        "abc": { id: "abc" },
        "def": { id: "def" },
      }
    };
    store.dispatch({ type: FIREBASE_SYNC, val });
    const state = store.getState();
    expect(state.entries).toEqual([
      { id: "abc" },
      { id: "def" },
    ]);
  });
});

describe('reducer', () => {
  it('should not crash when there are empty entries', () => {
    const val = null;
    const action = { type: FIREBASE_SYNC, val };
    const state = reducer({}, action);

    expect(state.entries).toEqual([]);
  });
});
