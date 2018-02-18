import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.css'
import './index.css';

import Root from './Root';

import registerServiceWorker from './registerServiceWorker';

import db from './db';



ReactDOM.render(<Root db={db} />, document.querySelector('#root'));
//registerServiceWorker();
