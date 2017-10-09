import React from 'react';

import Lifts from '../config/Lifts.jsx';
import Field from './Field.jsx';

class LiftControl extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.lifts = [
      <option key={-1}>none</option>
    ];


    this.lifts = this.lifts.concat(Lifts.getLiftNames().map((lift) => {
      return <option key={lift} value={lift}>{lift}</option>
    }));
  }

  render() {
    return (
      <Field name={this.props.name}>
          <select className='input select' value={this.props.value} name={this.props.name} onChange={this.props.onChange}>
            { this.lifts }
          </select>
      </Field>
    )
  }
}

module.exports = LiftControl;
