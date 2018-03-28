import React from 'react';

import Field from './Field.jsx';

export default class TextControl extends React.Component {
  render() {
    return (
      <Field name={this.props.name}>
          <input className='input' name={this.props.name} onChange={this.props.onChange} />
      </Field>
    )
  }
}
