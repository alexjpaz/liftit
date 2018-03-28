import React from 'react';

import './index.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';

export default class Calendar extends React.Component {
  render() {
    return (
      <div className='box'>
        <CurrentDateHeader />
        <WeekHeader />

        <div className='columns'>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
          <div className='column'>
            <Day date={new Date()} />
          </div>
        </div>

      </div>
    )
  }
}
