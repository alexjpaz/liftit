import React from 'react';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

class Log extends React.Component {
  constructor(props) {
    super(props);
  }

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

    console.log(newState);
    this.props.onChange(newState);
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <form>
          <DateControl name='date' onChange={this.handleOnChange}/>
          <LiftControl name='lift' onChange={this.handleOnChange}/>
          <RepControl name='reps' onChange={this.handleOnChange}/>
          <WeightControl name='weight' onChange={this.handleOnChange}/>
        </form>
        <hr />
        <pre>{ JSON.stringify(this.state, null, 4) }</pre>
      </div>
    );
  }
}

module.exports = Log;
