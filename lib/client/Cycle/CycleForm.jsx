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
    return (
      <div>
        <form>
          {this.control(DateControl, 'date')}
          {this.control(CycleLiftControl, 'press')}
          {this.control(CycleLiftControl, 'squat')}
          {this.control(CycleLiftControl, 'bench')}
          {this.control(CycleLiftControl, 'deadlift')}
          <hr />
          {this.saveButtonComponent()}
          {this.deleteButtonComponent()}
        </form>
      </div>
    );
  }
}

module.exports = Cycle;
