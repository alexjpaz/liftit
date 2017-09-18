import 'bulma/css/bulma.css'
import Gun from 'gun';

const gun = Gun([
  location.origin+'/gun'
]);

const Root = require('./Root.jsx');

import React from 'react';
import {render} from 'react-dom';
render(<Root gun={gun} />, document.querySelector('#app'));


