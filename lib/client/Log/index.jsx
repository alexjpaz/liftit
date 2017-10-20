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

    this.id = this.props.id || uuid().toString();

  }

  componentWillMount() {
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    const log = {
      type: "log"
    };

    this.setState({
      ...log,
      ...this.props.item
      });
  }

  handleOnChange(event) {
    event.preventDefault();

    var data = {};
    data[event.target.name] = event.target.value;

    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;

    this.setState(newState);

    console.log(1111111, newState);
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
          <hr />
          <button className='button is-primary'>Save</button>
          <button className='button is-pulled-right'>Delete</button>
        </form>
      </div>
    );
  }
}

module.exports = Log;
