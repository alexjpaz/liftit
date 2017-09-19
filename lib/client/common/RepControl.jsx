import React from 'react';

import Field from './Field.jsx';

class RepControl extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];
  }

  componentWillMount() {
    this.options = [
      <option>none</option>
    ];

    for(let i=0; i<15; i++) {
      this.options.push(
        <option value={i}>{i}</option>
      );
    }
  }

  render() {
    return (
      <Field name={this.props.name}>
          <select className='input select' name={this.props.name} onChange={this.props.onChange}>
            { this.options }
          </select>
      </Field>
    )
  }
}

module.exports = RepControl;
