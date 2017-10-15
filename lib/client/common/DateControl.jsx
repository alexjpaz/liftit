import React from 'react';

import Field from './Field.jsx';

class DateControl extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <Field name={this.props.name}>
          <input className='input' required value={this.props.value} name={this.props.name} onChange={this.props.onChange} type='date' />
        </Field>
    )
  }
}

module.exports = DateControl;
