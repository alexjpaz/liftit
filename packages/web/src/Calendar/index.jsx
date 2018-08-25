import React from 'react';

import './index.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';

export default class Calendar extends React.Component {
  render() {
    return (
      <div className='Calendar'>

        <div className="WeekHeader__Column">S</div>
        <div className="WeekHeader__Column">M</div>
        <div className="WeekHeader__Column">T</div>
        <div className="WeekHeader__Column">W</div>
        <div className="WeekHeader__Column">T</div>
        <div className="WeekHeader__Column">F</div>
        <div className="WeekHeader__Column">S</div>
        { /*
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
        </div> */ }

      </div>
    )
  }
}
