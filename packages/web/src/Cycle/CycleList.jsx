import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NoCyclesNotification from './NoCyclesNotification.jsx';

export default class CycleList extends Component {
  navigateToLog(logId) {
    return () => {
      this.props.history.push(`/cycles/${logId}`);
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
              <th>Press</th>
              <th>Deadlift</th>
              <th>Bench</th>
              <th>Squat</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item) => {
              return (
                <tr key={item._id} onClick={this.navigateToLog(item._id)}>
                <td>
                  <a key={item._id} href={"#/cycles/"+item._id}>
                    {item.date}
                  </a>
                </td>
                  <td>{item.press}</td>
                  <td>{item.deadlift}</td>
                  <td>{item.bench}</td>
                  <td>{item.squat}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      list = <NoCyclesNotification />
    }
    return (
      <div>
        {list}
      </div>
    )

  }
};

CycleList.propsTypes = {
  items: PropTypes.array.isRequired
}
