import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateUtils from '../common/DateUtils';

import NoLogsNotification from './NoLogsNotification.jsx';

import { connect } from 'react-redux';
import { 
  getLogs
} from '../Workbook/reducers/WorkbookReducers';

export class LogList extends Component {
  navigateToLog(logId) {
    return () => {
      this.props.history.push(`/logs/${logId}`);
    };
  }

  getSortedItems() {
    return this.props.items
      .sort(DateUtils.sort)
      .slice(0,this.props.limitTo)
    ;
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
            {this.getSortedItems().map((item) => {
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

LogList.defaultProps = {
  limitTo: 100
};



LogList.propsTypes = {
  items: PropTypes.array.isRequired
}

export const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
    items: getLogs(state.entries)
  }
}

export default connect(mapStateToProps)(LogList)
