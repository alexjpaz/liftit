import React from 'react';

import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Calendar />
        <Log />
      </div>
    );
  }
}

module.exports = Root;
