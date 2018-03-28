import React from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

export default class EntityRoute extends React.Component {
  constructor({match, history, db, firebaseDatabaseRef}) {
    super();
    this.id = match.params.id;
    this.db = db;
    this.firebaseDatabaseRef = firebaseDatabaseRef;
    this.history = history;
  }

  createNewEntity() {
    this.setState({
      isNew: true,
    });
  }

  componentWillMount() {
    if(this.id === 'new') {
      this.createNewEntity();
    }  else if(this.id) {
      this.firebaseDatabaseRef.child(this.id)
        .once('value')
        .then((snap) => {
          this.setState({
            ...this.state,
            ...snap.val()
          });
        });
    } else {
      this.firebaseDatabaseRef
        .once('value')
        .then((snap) => {
          const objects = snap.val();
          const keys = Object.keys(objects);
          const rows = keys.map(k => objects[k]);
          this.setState({list: rows});
        });
    }
  }

  async onSubmit(state) {
    if(state.isNew) {
      delete state.isNew;

      if(!state._id) {
        state._id = uuid().toString();
      }

      return await this.firebaseDatabaseRef.child(state._id).set(state);
    } else {
      return await this.firebaseDatabaseRef.child(state._id).set(state);
    }
  }

  async onDelete(state) {
    const newState = Object.assign({
      _deleted: true
    }, state);
    return await this.firebaseDatabaseRef.child(newState._id).set(newState);
  }

  render() {
    return null;
  }
}

EntityRoute.propTypes = {
  firebaseDatabaseRef: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired
};

