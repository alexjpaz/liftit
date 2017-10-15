import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

class LogRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div>
        <Log item={this.state} onSubmit={(state) => {
          this.db.put(state);
        }}/>
      </div>
    )
  }
};

module.exports = LogRoute;
