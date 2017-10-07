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

  fetchDocs() {
    this.db.allDocs({
      include_docs: true
    }).then((data) => {
      
      this.setState({
        ...this.state,
        data: data.rows.map(row => {
          console.log(row.id);
          return row.doc;
        })
      });
    });
  }

  componentWillMount() {
    this.fetchDocs();
    this.db.changes({
      live: true,
      since: 'now',
    }).on('change', (data) => {
      this.fetchDocs();
    });
  }

 

  render () {
    const compose = (component) => {
      const db = this.db;
      return ({match}) => new component({match, db});
    };
    if(!this.state || !this.state.data) {
      return null;
    }
    return (
      <Router>
          <Route path="/log/:id" component={compose(LogRoute)} />
        </Router>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired
};

module.exports = Root;
