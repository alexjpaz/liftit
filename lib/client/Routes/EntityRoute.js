import React from 'react';

class EntityRoute extends React.Component {
  constructor({match, history, db}) {
    super();
    this.id = match.params.id;
    this.db = db;
    this.history = history;
  }

  componentWillMount() {
    if(this.id) {
      console.log('lol', this.id)
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

}

module.exports = EntityRoute;
