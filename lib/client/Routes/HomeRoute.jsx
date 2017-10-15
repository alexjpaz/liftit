import React from 'react';
import EntityRoute from './EntityRoute';


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

class HomeRoute extends EntityRoute {
  getLastLog() {
    return this.state.list
        .filter((item) => item.type === 'log')
        .sort((a,b) => {
          a = new Date(a.date);
          b = new Date(b.date);
          return b-a;
        })
        .map((f) => {
          console.log(f);
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
            <LastLog history={this.history} item={this.getLastLog()} />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = HomeRoute;
