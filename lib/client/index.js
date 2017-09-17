const Root = require('./Root.jsx');

import React from 'react';
import {render} from 'react-dom';
render(<Root gun={window.gun} />, document.querySelector('#app'));
