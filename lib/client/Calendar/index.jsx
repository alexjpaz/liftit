import React from 'react';

class Calendar extends React.Component {
  render() {
    return (
      <div className='Calendar'>
        <p>{ this.props.name }</p>
      </div>
    )
  }
}

module.exports = Calendar;
