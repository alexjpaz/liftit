import store, {
  firebaseInit,
  firebaseReady,
  FIREBASE_SYNC,
  FIREBASE_READY,
  reducer
} from './store';

describe('action creaters', () => {
  test('firebaseReady', () => {
    const firebase = {};

    const result = firebaseReady(firebase);

    expect(result).toEqual({
      type: FIREBASE_READY,
      value: firebase
    });
  });

  test('firebaseInit', async () => {
    const auth = {
      currentUser: {
        uid: "FAKE"
      }
    };
    const ref = {
      on: jest.fn()
    };
    const database = {
      ref: jest.fn(() => ref)
    };
    const firebase = {
      database: jest.fn(() => database),
      auth: jest.fn(() => auth)
    };

    const thunk = firebaseInit(firebase);

    const dispatch = jest.fn();

    await thunk(dispatch);

    expect(ref.on).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith({
      type: FIREBASE_READY,
      value: firebase
    });
  });
});

describe('store', () => {
  it('should ignore bad actions', () => {
    store.dispatch({ type: 'FAKE' });
    const state = store.getState();
    expect(state).toEqual({ entries: [] });
  });

  it('should sync values', () => {
    const val = {
      "abc": { id: "abc" },
      "def": { id: "def" },
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
