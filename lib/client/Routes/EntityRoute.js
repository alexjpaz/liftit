import React from 'react';

class EntityRoute extends React.Component {
  constructor({match, history, db}) {
    super();
    this.id = match.params.id;
    this.db = db;
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
      this.db.get(this.id)
        .then((data) => {
          this.setState({
            ...this.state,
            ...data
          });
        });
    } else {
      this.db.allDocs({
        include_docs: true
      })
        .then((data) => {
            const rows = data.rows.map(r => r.doc);
            this.setState({list: rows});
        });
    }
  }

  async onSubmit(state) {
    if(state.isNew) {
      delete state.isNew;
      return await this.db.post(state);
    } else {
      return await this.db.put(state);
    }
  }

  async onDelete(state) {
    const newState = Object.assign({
      _deleted: true
    }, state);
    return await this.db.put(newState);
  }

  render() {
    return null;
  }
}

module.exports = EntityRoute;
