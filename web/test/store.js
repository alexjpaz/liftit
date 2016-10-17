const expect = require("chai").expect;
const Store = require('../app/store');
const P = require("bluebird/js/browser/bluebird.core");

const NOOP = () => {};

describe('store', () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = {
      set: NOOP,
      store: NOOP
    };
  });

  it('should create successfully when properly configured', (done) => {
    let config = {};
    let storage = mockStorage;
    let reducer = {};
    let session = {
      store: () => {
        return P.resolve();
      },
      fetch: () => {
        return P.resolve({
          events: {
            foo: "a"
          }
        });
      }
    };

    let store = new Store(config, storage, reducer, session);

    let guid = store.guid();

    expect(store.events).to.deep.equal({});

    let initPromise = store.init();

    store.on('persistSuccess', () => {
      expect(store.events.foo).to.be.equal("a");
      done();
    });
  });
});
