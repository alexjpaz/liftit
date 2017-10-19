import React from 'react';

import EntityRoute from './EntityRoute';

import CycleList from '../Cycle/CycleList.jsx';

import Breadcrumb from './Breadcrumb.jsx';

class CycleRoute extends EntityRoute {
  getCycleList() {
    return this.state.list
      .filter(item => item.type === 'cycle')
      .sort((a,b) => new Date(b.date) - new Date(a.date))
    ;
  }

  render() {
    if(!this.state) {
      return null;
    }

    if(this.state.list && this.state.list.length > 0) {
      return (
        <div>
          <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
            ]}
            active={'Cycle'}/>
          <CycleList 
            history={this.history}
            items={this.getCycleList()} />
        </div>
      );
    }
  }
};

module.exports = CycleRoute;
