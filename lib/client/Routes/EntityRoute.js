import React from 'react';

class EntityRoute extends React.Component {
  constructor({match, db}) {
    super();
    this.id = match.params.id;
    this.db = db;
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
      this.db.allDocs()
        .then((data) => {
          this.setState({list: data.rows});
        });
    }
  }

}

module.exports = EntityRoute;
