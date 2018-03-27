import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './layout/Navbar.jsx';

import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

import LogRoute from './Routes/LogRoute.jsx';
import LogListRoute from './Routes/LogListRoute.jsx';

import CycleRoute from './Routes/CycleRoute.jsx';
import CycleListRoute from './Routes/CycleListRoute.jsx';

import HomeRoute from './Routes/HomeRoute';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.firebase = props.firebase;
  }

  render () {
    const compose = (component) => {
      const db = this.db;
      const firebaseDatabaseRef = this.firebase.database().ref('users/local');
      if(typeof component !== 'function') {
        throw new Error("Component is not a function! " + component)
      }
      return ({match, history}) => new component({match, history, db, firebaseDatabaseRef});
    };
    return (
      <div className='container'>
        <Navbar />
          <div className="container">
            <Router>
              <div>
                <Route exact path="/" component={compose(HomeRoute)} />
                <Route exact path="/logs" component={compose(LogListRoute)} />
                <Route path="/logs/:id" component={compose(LogRoute)} />
                <Route exact path="/cycles" component={compose(CycleListRoute)} />
                <Route exact path="/cycles/:id" component={compose(CycleRoute)} />
              </div>
            </Router>
          </div>
      </div>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

