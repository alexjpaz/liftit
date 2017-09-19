import React from 'react';

import Lifts from '../config/Lifts.jsx';
import Field from './Field.jsx';

class LiftControl extends React.Component {
  constructor(props) {
    super(props);

    this.lifts = Lifts.getLiftNames();
  }

  render() {
    return (
      <Field name={this.props.name}>
          <select className='input select' name={this.props.name} onChange={this.props.onChange}>
            { 
              this.lifts.map((lift) => {
                return (<option value={lift}>{lift}</option>)
              })
            }
          </select>
      </Field>
    )
  }
}

module.exports = LiftControl;
