import React from 'react';
import ReactDOM from 'react-dom';

import './styles.js';

import Root from './Root';

//import registerServiceWorker from './registerServiceWorker';

(async () => {
  const { getFirebaseInstance } = await import('./firebase/index.js')

  const { firebase, name } = await getFirebaseInstance();

  console.log("%cfirebase module loaded: %c%s ", 'font-weight: bold; color: #a00', 'font-weight: none', name);

  ReactDOM.render(<Root db={{}} firebase={firebase} />, document.querySelector('#root'));
})();

//registerServiceWorker();
