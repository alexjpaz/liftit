import 'bulma/css/bulma.css'
import PouchDB from 'pouchdb';

const db = new PouchDB("liftit"); 

const Root = require('./Root.jsx');

import React from 'react';
import {render} from 'react-dom';
render(<Root db={db} />, document.querySelector('#app'));
