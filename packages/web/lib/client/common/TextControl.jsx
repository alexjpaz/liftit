import React from 'react';

import Field from './Field.jsx';

class TextControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Field name={this.props.name}>
          <input className='input' name={this.props.name} onChange={this.props.onChange} />
      </Field>
    )
  }
}

module.exports = TextControl;
