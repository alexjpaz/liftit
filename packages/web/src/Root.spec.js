import React from 'react';
import Root from './Root';

import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render } from 'enzyme';

import store, { firebaseSync } from './store';

import { Provider } from 'react-redux';

describe('<Root />', () => {
  let firebase;

  beforeEach(async () => {
    const { getFirebaseInstance } = await import('./firebase/index.js')

    const instance  = await getFirebaseInstance();

    firebase = instance.firebase;

    const snapshot = {
      val: jest.fn(() => ({
        local: {}
      }))
    };

    store.dispatch(firebaseSync(snapshot));
  });

  test('empty snapshot', async () => {
    const dom = render(
      <Provider store={store}>
        <Root db={{}} firebase={firebase} />
      </Provider>
    );

    expect(dom.html()).toContain('<h1>loading</h1>');
  });

  xtest('snapshot with some data', async () => {

    const snapshot = {
      val: jest.fn(() => ({
        local: {
          "123": { }
        }
      }))
    };

    store.dispatch(firebaseSync(snapshot));

    const dom = render(
      <Provider store={store}>
        <Root db={{}} firebase={firebase} />
      </Provider>
    );

    expect(dom.html()).not.toContain('<h1>loading</h1>');
  });

});
