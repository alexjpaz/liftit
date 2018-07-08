import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './layout/Navbar.jsx';

import LogRoute from './Routes/LogRoute.jsx';
import LogListRoute from './Routes/LogListRoute.jsx';

import CycleRoute from './Routes/CycleRoute.jsx';
import CycleListRoute from './Routes/CycleListRoute.jsx';

import HomeRoute from './Routes/HomeRoute';

import Authentication from './components/Authentication';

import { initFirebaseDatabaseRef } from './helpers';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.firebase = props.firebase;

    this.state = {
      isAuthenticated: false,
    };
  }

  async initFirebaseDatabaseRef() {
    const firebaseDatabaseRef = await initFirebaseDatabaseRef(this.firebase);

    this.setState({
      ...this.state,
      firebaseDatabaseRef,
      isAuthenticated: true,
    });
  }


  componentWillMount() {
    this.initFirebaseDatabaseRef();
  }

  render () {
    if(!this.state.isAuthenticated) {
      return <Authentication />;
    }

    const compose = (component) => {
      const firebaseDatabaseRef = this.state.firebaseDatabaseRef;
      if(typeof component !== 'function') {
        throw new Error("Component is not a function! " + component)
      }
      return ({match, history}) => new component({match, history, firebaseDatabaseRef});
    };
    return (
      <div className='container'>
        <Navbar />
            <Router>
              <div>
                <Route exact path="/" component={compose(HomeRoute)} />
                <Route exact path="/logs" component={compose(LogListRoute)} />
                <Route path="/logs/:id" component={compose(LogRoute)} />
                <Route exact path="/cycles" component={compose(CycleListRoute)} />
                <Route exact path="/cycles/:id" component={compose(CycleRoute)} />
                <Route exact path="/signout" component={() => {
                  this.firebase.auth().signOut();
                  return <h1>Signing out</h1>
                }} />
              </div>
            </Router>
      </div>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

