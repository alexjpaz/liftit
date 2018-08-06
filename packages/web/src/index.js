import React from 'react';
import ReactDOM from 'react-dom';

import './styles.js';

import Root from './Root';

import { Provider } from 'react-redux';

import store, { firebaseInit } from './store';

export const startApp = async (options) => {
  const { getFirebaseInstance } = await import('./firebase/index.js')

  const { firebase, name } = await getFirebaseInstance();

  console.log("%cfirebase module loaded: %c%s ", 'font-weight: bold; color: #a00', 'font-weight: none', name);

  store.dispatch(firebaseInit(firebase));

  const element = (
    <Provider store={store}>
      <Root db={{}} firebase={firebase} />
    </Provider>
  )

  const node = document.querySelector('#root');

  ReactDOM.render(element, node);
};

startApp({});
//registerServiceWorker();
