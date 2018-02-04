import React from 'react';

export default class NoLogsNotification extends React.Component {
  render() {
    return (
      <div className='notification is-info'>
        <p className='subtitle'>
          There doesn't seem to be any logs. <a href='#/logs/new'>Add a log</a> to get started!
        </p>
      </div>
    );

  }
}
