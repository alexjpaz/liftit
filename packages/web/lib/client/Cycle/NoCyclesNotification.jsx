import React from 'react';

class NoCyclesNotification extends React.Component {
  render() {
    return (
      <div className='notification is-info'>
        <p className='subtitle'>
          There doesn't seem to be any cycles. <a href='#/cycles/new'>Add a cycle</a> to get started!
        </p>
      </div>
    );

  }
}

module.exports = NoCyclesNotification;
