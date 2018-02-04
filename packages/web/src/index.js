import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.css'
import './index.css';

import Root from './Root';

import registerServiceWorker from './registerServiceWorker';

import PouchDB from 'pouchdb';
const db = new PouchDB("liftit"); 

ReactDOM.render(<Root db={db} />, document.querySelector('#root'));
registerServiceWorker();
