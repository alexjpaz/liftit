import React from 'react';
import ReactDOM from 'react-dom';

import './styles.js';

import Root from './Root';

import { Provider } from 'react-redux';

//import registerServiceWorker from './registerServiceWorker';

import store, { firebaseSync } from './store';

import { initFirebaseDatabaseRef } from './helpers';

(async () => {
  const { getFirebaseInstance } = await import('./firebase/index.js')

  const { firebase, name } = await getFirebaseInstance();

  console.log("%cfirebase module loaded: %c%s ", 'font-weight: bold; color: #a00', 'font-weight: none', name);


  const ref = await initFirebaseDatabaseRef(firebase);

  ref.on("value", (snapshot) => {
    store.dispatch(firebaseSync(snapshot));
  });

  const element = (
    <Provider store={store}>
      <Root db={{}} firebase={firebase} />
    </Provider>
  )

  const node = document.querySelector('#root');

  ReactDOM.render(element, node);
})();

//registerServiceWorker();
