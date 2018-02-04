import React from 'react';

import Field from './Field.jsx';

export default class RepControl extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];
  }

  componentWillMount() {
    this.options = [
      <option key={-1}>none</option>
    ];

    for(let i=0; i<15; i++) {
      this.options.push(
        <option key={i} value={i}>{i}</option>
      );
    }
  }

  render() {
    return (
      <Field name={this.props.name}>
          <select className='input select' required value={this.props.value} name={this.props.name} onChange={this.props.onChange}>
            { this.options }
          </select>
      </Field>
    )
  }
}
