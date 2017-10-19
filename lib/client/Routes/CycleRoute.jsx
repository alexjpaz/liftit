import React from 'react';

import EntityRoute from './EntityRoute';

import CycleForm from '../Cycle/CycleForm.jsx';

import Breadcrumb from './Breadcrumb.jsx';

class LogRoute extends EntityRoute {

  createNewEntity() {
    this.setState({
      isNew: true,
      date: new Date().toISOString().slice(0,10),
      type: 'cycle',
      lifts: {}
    });
  }

  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div>
        <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
            { title: 'Cycles', href: '/cycles' }
          ]}
          active={'New'}/>
        <CycleForm item={this.state} onSubmit={(state) => {
          if(this.state.isNew) {
            this.state.isNew = undefined;
            this.db.post(this.state);
          } else {
            this.db.put(state);
          }
        }}/>
      </div>
    )
  }
};

module.exports = LogRoute;
