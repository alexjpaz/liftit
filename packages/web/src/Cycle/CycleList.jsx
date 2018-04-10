import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateUtils from '../common/DateUtils';

import NoCyclesNotification from './NoCyclesNotification.jsx';

import { lifts } from '../common/Constants';

export class TrendDirection extends Component {
  render() {
    const { delta } = this.props;
    let direction = 'fa-minus';
    let color = null;

    if(delta > 0) {
      direction = 'fa-arrow-alt-circle-up';
      color = 'has-text-success';
    }

    if(delta < 0) {
      direction = 'fa-arrow-alt-circle-down';
      color = 'has-text-danger';
    }

    if(direction) {
      return (
        <span className={color}>
          <i className={`far ${direction}`}></i>
        </span>
      );
    } else {
      return null;
    }
  }
}

export class CycleListLiftCell extends Component {
  render() {
    const { item, lift } = this.props;

    const max = item[lift];

    let cell = null;

    const delta = item[`${lift}_delta`];
    const fraction = item[`${lift}_fraction`];

    if(!max) {
      cell = (
        <td>
        </td>
      );
    } else if(!delta) {
      cell = (
        <td>
          <span>{item[lift]}</span>
        </td>
      );
    } else {
      cell = (
        <td>
          <TrendDirection delta={delta} />
          <span> {item[lift]}</span>
          <span className='has-text-grey is-size-7'>
            <span> </span>
            <span> </span>
            <span>{delta} </span> 
            <span>({fraction}%)</span>
          </span>
        </td>
      );
    }

    return cell;
  }
}

export default class CycleList extends Component {
  navigateTo(id) {
    return () => {
      this.props.history.push(`/cycles/${id}`);
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
      p[`${c}_fraction`] = Math.round(100 - (+previousCycle[c] / +cycle[c]) * 100) || 0;
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
              {lifts.map((lift) => (
              <th key={lift}>{lift}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.getSortedItems().map((item) => {
              return (
                <tr id={`cycle__${item._id}`} key={item._id} onClick={this.navigateTo(item._id)}>
                <td>
                  <a key={item._id} href={"#/cycles/"+item._id}>
                    {item.date}
                  </a>
                </td>
                  {lifts.map((lift) => <CycleListLiftCell key={lift} lift={lift} item={item} />)}
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
