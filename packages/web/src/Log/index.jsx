import React from 'react';

import EntityForm from '../Entity/EntityForm.jsx';

import {
  DateControl,
  LiftControl,
  RepControl,
  WeightControl
} from '../common/index.jsx';

export default class Log extends EntityForm {
  getType() {
    return "log";
  }

  render() {
    return (
      <div id={`Log-${this.props.id}`}>
        <form>
          {this.control(DateControl, 'date')}
          {this.control(LiftControl, 'lift')}
          {this.control(RepControl, 'reps')}
          {this.control(WeightControl, 'weight')}
          <hr />
          {this.saveButtonComponent()}
          {this.deleteButtonComponent()}
        </form>
      </div>
    );
  }
}
