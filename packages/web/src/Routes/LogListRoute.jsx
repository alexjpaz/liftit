import React from 'react';

import EntityRoute from './EntityRoute';

import LogList from '../Log/LogList.jsx';

import Breadcrumb from './Breadcrumb.jsx';

export default class LogListRoute extends EntityRoute {
  getLogList() {
    return this.state.list
      .filter(item => item.type === 'log')
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
          active={'Logs'}/>
        <a className="button is-link is-outlined" href='#/logs/new'>Add new log</a>
        <div>
          <LogList 
            history={this.history}
            items={this.getLogList()} />
        </div>
      </div>
    );
  }
};
