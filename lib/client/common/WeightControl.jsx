import React from 'react';

import Field from './Field.jsx';

class WeightControl extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];
  }

  render() {
    return (
      <Field name={this.props.name}>
        <input className='input select' name={this.props.name} onChange={this.props.onChange} type='number' />
      </Field>
    )
  }
}

module.exports = WeightControl;
