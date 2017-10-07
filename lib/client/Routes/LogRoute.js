import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

class LogRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return null;
    }
    return (
      <Log item={this.state} onSubmit={(state) => {
        this.db.put(state);
      }}/>
    )

  }
};

module.exports = LogRoute;
