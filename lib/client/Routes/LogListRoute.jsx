import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

import NoLogsNotification from '../Log/NoLogsNotification.jsx';

class LogRoute extends EntityRoute {
  getLogList() {
    return this.state.list
      .filter(item => item.type === 'log')
      ;
  }
  navigateToLog(logId) {
    return () => {
      this.history.push(`/logs/${logId}`);
    };
  }
  render() {
    if(!this.state) {
      return null;
    }

    let list = null

    if(this.state.list && this.state.list.length > 0) {
      list = (
        <table className='table is-bordered is-striped is-narrow is-fullwidth'>
          <tbody>
            {this.getLogList().map((item) => {
              return (
                <tr key={item._id} onClick={this.navigateToLog(item._id)}>
                <td>
                  <a key={item._id} href={"#/logs/"+item._id}>
                    {item.date}
                  </a>
                </td>
                  <td>{item.lift}</td>
                  <td>{item.weight}</td>
                  <td>{item.reps}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      list = <NoLogsNotification />
    }
    return (
      <div>
        {list}
      </div>
    )

  }
};

module.exports = LogRoute;
