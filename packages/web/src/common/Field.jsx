import React from 'react';

export default class Field extends React.Component {
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
