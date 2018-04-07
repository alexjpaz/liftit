import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateUtils from '../common/DateUtils';

import NoCyclesNotification from './NoCyclesNotification.jsx';

const lifts = ['press','deadlift','bench','squat'];

export default class CycleList extends Component {
  navigateToLog(logId) {
    return () => {
      this.props.history.push(`/cycles/${logId}`);
    };
  }

  getSortedItems() {
    return this.props.items
      .sort(DateUtils.sort)
      .map(this.decorateCycles)
      .slice(0,this.props.limitTo)
    ;
  }

  decorateCycles(cycle, i, cycles) {
    const previousCycle = cycles[i+1];
    if(!previousCycle) {
      return cycle;
    }

    const delta = lifts.reduce((p,c) => {
      p[`${c}_delta`] = cycle[c] - previousCycle[c];
      p[`${c}_fraction`] = 100 - Math.round((previousCycle[c] / cycle[c]) * 100);
      return p;
    }, {});
    
    const c = Object.assign({}, cycle, delta);
    return c
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
            {this.getSortedItems().map((item) => {
              return (
                <tr key={item._id} onClick={this.navigateToLog(item._id)}>
                <td>
                  <a key={item._id} href={"#/cycles/"+item._id}>
                    {item.date}
                  </a>
                </td>
                  {lifts.map((lift) => (
                  <td>{item[lift]} <p className='has-text-grey is-size-7'>{item[`${lift}_delta`]} {item[`${lift}_fraction`]}</p></td>
                  ))}
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

CycleList.defaultProps = {
  limitTo: 100
};

CycleList.propsTypes = {
  items: PropTypes.array.isRequired
}
