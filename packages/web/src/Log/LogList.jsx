import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NoLogsNotification from './NoLogsNotification.jsx';

export default class LogList extends Component {
  navigateToLog(logId) {
    return () => {
      this.props.history.push(`/logs/${logId}`);
    };
  }
 
  render() {

    let list = null;

    if(this.props.items && this.props.items.length > 0) {
      list = (
        <table className='table is-fullwidth'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Lift</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item) => {
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

LogList.propsTypes = {
  items: PropTypes.array.isRequired
}
