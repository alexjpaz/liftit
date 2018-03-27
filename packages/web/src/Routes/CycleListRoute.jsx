import React from 'react';

import EntityRoute from './EntityRoute';

import CycleList from '../Cycle/CycleList.jsx';

import Breadcrumb from './Breadcrumb.jsx';

export default class CycleListRoute extends EntityRoute {
  getCycleList() {
    return this.state.list
      .filter(item => item.type === 'cycle')
      .filter(item => !item._deleted)
      .sort((a,b) => new Date(b.date) - new Date(a.date))
    ;
  }

  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div>
        <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
          ]}
          active={'Cycle'}/>
        <a className="button is-link is-outlined" href='#/cycles/new'>Add new cycle</a>
        <CycleList 
          history={this.history}
          items={this.getCycleList()} />
      </div>
    );
  }
};
