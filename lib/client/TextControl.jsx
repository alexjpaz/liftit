import React from 'react';

class TextControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className='input' name={this.props.name} onChange={this.props.onChange} />
        </div>
      </div>
    )
  }
}

module.exports = TextControl;
