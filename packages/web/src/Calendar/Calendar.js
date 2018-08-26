import React from 'react';

import './Calendar.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';

export default class Calendar extends React.Component {
  generateDays() {
    const days = Array(5*7).fill(true).map((e,i) => {
      const date = new Date();
      return <Day date={date} />
    });

    return days;
  }

  render() {
    const days = this.generateDays();
    return (
      <div className='Calendar'>
        <WeekHeader />
        {days}
      </div>
    )
  }
}
