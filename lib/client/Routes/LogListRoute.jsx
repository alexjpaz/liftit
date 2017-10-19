import React from 'react';

import EntityRoute from './EntityRoute';

import LogList from '../Log/LogList.jsx';

class LogRoute extends EntityRoute {
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

    if(this.state.list && this.state.list.length > 0) {
      return (
        <div>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><a href="#">Workbook</a></li>
              <li className="is-active"><a href="#" aria-current="page">Logs</a></li>
            </ul>
        </nav>
          <LogList 
            history={this.history}
            items={this.getLogList()} />
        </div>
      );
    }
  }
};

module.exports = LogRoute;
