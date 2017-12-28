import React from 'react';
import uuid from 'uuid';

import EntityForm from '../Entity/EntityForm.jsx';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

class Log extends EntityForm {
  getType() {
    return "log";
  }

  render() {
    const control = (Component, name) => {
      return (<Component 
          name={name}
          onChange={this.handleOnChange}
          value={this.state[name] || ''}
        />)
          
    }
    return (
      <div id={`Log-${this.props.id}`}>
        <form>
          {control(DateControl, 'date')}
          {control(LiftControl, 'lift')}
          {control(RepControl, 'reps')}
          {control(WeightControl, 'weight')}
          <hr />
          {this.saveButtonComponent()}
          {this.deleteButtonComponent()}
        </form>
      </div>
    );
  }
}

module.exports = Log;
