import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './layout/Navbar.jsx';

import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

import LogRoute from './Routes/LogRoute.jsx';
import RootRoute from './Routes/RootRoute';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
  }

  render () {
    const compose = (component) => {
      const db = this.db;
      return ({match, history}) => new component({match, history, db});
    };
    return (
      <div>
        <Navbar />
        <section className="section">
          <div className="container">
            <Router>
              <div>
                <Route exact path="/" component={compose(RootRoute)} />
                <Route exact path="/logs" component={compose(LogRoute)} />
                <Route path="/logs/:id" component={compose(LogRoute)} />
              </div>
            </Router>
          </div>
        </section>
      </div>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired
};

module.exports = Root;
