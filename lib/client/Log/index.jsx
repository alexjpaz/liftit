import React from 'react';

import DateControl from '../common/DateControl.jsx';
import LiftControl from '../common/LiftControl.jsx';

class Log extends React.Component {
  componentWillMount() {
    this.setState({});
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();

    var data = {};
    data[event.target.name] = event.target.value;

    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <form>
          <DateControl name='date' onChange={this.handleOnChange}/>
          <LiftControl name='lift' onChange={this.handleOnChange}/>
        </form>
        <hr />
        <pre>{ JSON.stringify(this.state, null, 4) }</pre>
      </div>
    );
  }
}

module.exports = Log;
