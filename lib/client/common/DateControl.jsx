import React from 'react';

import Field from './Field.jsx';

class DateControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Field name={this.props.name}>
          <input className='input' name={this.props.name} onChange={this.props.onChange} type='date' />
        </Field>
    )
  }
}

module.exports = DateControl;
