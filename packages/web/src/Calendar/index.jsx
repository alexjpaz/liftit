import React from 'react';

export default class Calendar extends React.Component {
  render() {
    return (
      <div className='Calendar'>
        <h1>Calendar</h1>
        <p>{ this.props.name }</p>
      </div>
    )
  }
}