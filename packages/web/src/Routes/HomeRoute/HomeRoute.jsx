import React from 'react';
import EntityRoute from '../EntityRoute';

import NoLogsNotification from '../../Log/NoLogsNotification.jsx';
import NoCyclesNotification from '../../Cycle/NoCyclesNotification.jsx';

import Calendar from '../../Calendar/index.jsx';

class LastLog extends React.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.item = this.props.item;
  }

  navigateToLog(logId) {
    return () => { 
      this.history.push(`/logs/${logId}`)
    };
  }

  render() {
    if(!this.props.item) {
      return null;
    }
    return (
      <article className='notification is-info' onClick={this.navigateToLog(this.props.item._id)}>
        <p>
          <strong>Most recent log </strong>
          <small>{this.item.date}</small>
        </p>
        <p>
          {this.item.lift} {this.item.weight}x{this.item.reps}
        </p>
      </article>
    );
  }
}

export default class HomeRoute extends EntityRoute {
  hasEmptyCycles() {
    return this.state.list
      .filter((item) => item.type === 'cycle')
      .filter(item => !item._deleted)
      .length === 0;
  }

  hasEmptyLogs() {
    return this.state.list
      .filter((item) => item.type === 'log')
      .filter(item => !item._deleted)
      .length === 0;
  }

  getLastLog() {
    return this.state.list
        .filter((item) => item.type === 'log')
        .filter(item => !item._deleted)
        .sort((a,b) => {
          a = new Date(a.date);
          b = new Date(b.date);
          return b-a;
        })
        .map((f) => {
          return f;
        })
        .find((item) => item)
      ;
  }

  getLastCycle() {
    return this.state.list
      .filter((item) => item.type === 'cycle')
      .filter(item => !item._deleted)
      .sort((a,b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b-a;
      })
      .map((f) => {
        return f;
      })
      .find((item) => item)
    ;
  }

  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical ">
          <div className="tile is-child">
            <Calendar />
          </div>
          <div className="tile is-child">
            <LastLog history={this.history} item={this.getLastLog()} />
          </div>
          { this.hasEmptyLogs() && 
          <div className="tile is-child">
              <NoLogsNotification />
          </div>
          }

          { this.hasEmptyCycles() && 
          <div className="tile is-child">
              <NoCyclesNotification />
          </div>
          }
        </div>
      </div>
    )
  }
}

