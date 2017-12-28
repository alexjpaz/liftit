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
    this.handleOnDelete = this.handleOnDelete.bind(this);

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
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state);
      history.back();
    }
  }

  handleOnDelete(event) {
    event.preventDefault();
    if(this.props.onDelete) {
      this.props.onDelete(this.state);
      history.back();
    }
  }

  render() {
    return (
      <div id={`Log-${this.props.id}`}>
        <form>
          <DateControl name='date' onChange={this.handleOnChange} value={this.state.date} />
          <LiftControl name='lift' onChange={this.handleOnChange} value={this.state.lift} />
          <RepControl name='reps' onChange={this.handleOnChange} value={this.state.reps} />
          <WeightControl name='weight' onChange={this.handleOnChange} value={this.state.weight} />
          <hr />
          <button className='button is-primary the-save-button' onClick={this.handleOnSubmit}>Save</button>
          <button className='button is-pulled-right the-delete-button' onClick={this.handleOnDelete}>Delete</button>
        </form>
      </div>
    );
  }
}

module.exports = Log;
