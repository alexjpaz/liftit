import React from 'react';
import uuid from 'uuid';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

import CycleLiftControl from './CycleLiftControl.jsx'; 

class Cycle extends React.Component {
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
  }

  handleOnSubmit(event) {
    event.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state);
      history.back();
    }
  }

  render() {
    const control = (Component, name) => {
      return (<Component 
          name={name}
          onChange={this.handleOnChange}
          value={this.state[name]}
        />)
          
    }
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>

          {control(DateControl, 'date')}
          {control(CycleLiftControl, 'press')}
          {control(CycleLiftControl, 'squat')}
          {control(CycleLiftControl, 'bench')}
          {control(CycleLiftControl, 'deadlift')}
          <hr />
          <button className='button is-primary'>Save</button>
          <button className='button is-pulled-right'>Delete</button>
        </form>
      </div>
    );
  }
}

module.exports = Cycle;
