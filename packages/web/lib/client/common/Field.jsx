import React from 'react';

class Field extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
     <div className="field">
        <label className="label">{this.props.name}</label>
        <div className="control">
          { this.props.children }
        </div>
      </div>
    );
  }
}

module.exports = Field;
