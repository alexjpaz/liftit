import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom'


import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

import LogRoute from './Routes/LogRoute';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
  }

  render () {
    const compose = (component) => {
      const db = this.db;
      return ({match}) => new component({match, db});
    };
    return (
      <Router>
        <div>
          <Route exact path="/logs" component={compose(LogRoute)} />
          <Route path="/logs/:id" component={compose(LogRoute)} />
        </div>
      </Router>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired
};

module.exports = Root;
