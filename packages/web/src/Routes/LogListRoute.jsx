import React from 'react';

import EntityRoute from './EntityRoute';

import LogList from '../Log/LogList.jsx';

import Breadcrumb from './Breadcrumb.jsx';

export default class LogListRoute extends EntityRoute {
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
          <LogList history={this.history} />
        </div>
      </div>
    );
  }
};
