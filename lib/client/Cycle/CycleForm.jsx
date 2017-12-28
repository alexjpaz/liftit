import React from 'react';
import uuid from 'uuid';

import EntityForm from '../Entity/EntityForm.jsx';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

import CycleLiftControl from './CycleLiftControl.jsx'; 

class Cycle extends EntityForm {
  getType() {
    return "cycle";
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
        <form>
          {control(DateControl, 'date')}
          {control(CycleLiftControl, 'press')}
          {control(CycleLiftControl, 'squat')}
          {control(CycleLiftControl, 'bench')}
          {control(CycleLiftControl, 'deadlift')}
          <hr />
          {this.saveButtonComponent()}
          {this.deleteButtonComponent()}
        </form>
      </div>
    );
  }
}

module.exports = Cycle;
