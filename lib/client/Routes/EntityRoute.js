import React from 'react';

class EntityRoute extends React.Component {
  constructor({match, db}) {
    super();
    this.id = match.params.id;
    this.db = db;
  }

  componentWillMount() {
    this.db.get(this.id)
      .then((data) => {
        this.setState({
          ...this.state,
          ...data
        });
      });
  }

  persist() {
    return (item) => {
      this.db.put(item);
    };
  }

  render() {
    return <p>{JSON.stringify(this.state)}</p>
  }

}

module.exports = EntityRoute;
