import React, { Component } from 'react';

export default class Info extends Component {
  render() {
    return (
      <p className='muted'>
        {this.props.date.toISOString()}
      </p>
    );
  }
}
