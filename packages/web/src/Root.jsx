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

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.firebase = props.firebase;

    this.state = {
      isAuthenticated: false,
    };
  }

  componentWillMount() {
    const setFirebaseDatabaseRef = (user) => {
      if (user) {
        const firebaseDatabaseRef = this.firebase.database().ref(`users/${user.uid}`);

        this.setState({
          ...this.state,
          firebaseDatabaseRef,
          isAuthenticated: true,
        });

      } else {
        console.log("Ther is no user session. You must log in");
      }
    }

    if(this.firebase.auth().currentUser) {
      setFirebaseDatabaseRef(this.firebase.auth().currentUser);
      return;
    } else {
      this.firebase.auth().onAuthStateChanged(setFirebaseDatabaseRef);
    }
  }

  render () {
    console.log(this.state);
    if(!this.state.isAuthenticated) {
      return <Authentication />;
    }

    const compose = (component) => {
      const db = this.db;
      const firebaseDatabaseRef = this.state.firebaseDatabaseRef;
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
                <Route exact path="/signout" component={() => {
                  this.firebase.auth().signOut();
                  return <h1>Signing out</h1>
                }} />
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

