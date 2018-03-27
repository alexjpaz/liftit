import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.css'
import './index.css';

import Root from './Root';

import registerServiceWorker from './registerServiceWorker';

import firebase from './firebase';

ReactDOM.render(<Root db={{}} firebase={firebase} />, document.querySelector('#root'));
//registerServiceWorker();
