import React from 'react';
import uuid from 'uuid';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

class Log extends React.Component {
  constructor(props) {
    super(props);

    this.id = "dac2fe7c-74ba-4c60-a0d1-e7b246c13552" || this.props.id || uuid().toString();

  }

  componentWillMount() {
      this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    console.log(534435, this.props);
    this.setState(this.props.item || {});
  }

  handleOnChange(event) {
    event.preventDefault();

    var data = {};
    data[event.target.name] = event.target.value;

    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state);
      history.back();
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <DateControl name='date' onChange={this.handleOnChange} value={this.state.date} />
          <LiftControl name='lift' onChange={this.handleOnChange} value={this.state.lift} />
          <RepControl name='reps' onChange={this.handleOnChange} value={this.state.reps} />
          <WeightControl name='weight' onChange={this.handleOnChange} value={this.state.weight} />

          <button className='button'>Save</button>
        </form>
        <hr />
      </div>
    );
  }
}

module.exports = Log;
