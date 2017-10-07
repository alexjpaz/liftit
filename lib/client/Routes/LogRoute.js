import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

class LogRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return null;
    }

    let list = null
    if(this.state.list) {
      list = this.state.list.map((item) => {
        return (
          <p><a key={item.id} href={"#/logs/"+item.id}>{item.id}</a></p>
        )
      })
    }
    return (
      <div>
        {list}
        <Log item={this.state} onSubmit={(state) => {
          this.db.put(state);
        }}/>
      </div>
    )

  }
};

module.exports = LogRoute;
