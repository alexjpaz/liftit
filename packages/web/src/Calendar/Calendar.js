import React from 'react';

import './Calendar.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';

export default class Calendar extends React.Component {
  getCurrentDate() {
    return new Date();
  }

  getFirstDay(date = new Date()) {
    const clonedDate = new Date(date);
    let firstDay = new Date(clonedDate.getFullYear(), clonedDate.getMonth(), 1);
    return firstDay;
  }

  getNumberOfDaysInTheMonthOf(date = new Date()) {
    const month = date.getMonth()+1;
    const year = date.getYear();

    const targetDate = new Date(year, month, 0);

    const days = targetDate.getDate();

    return days;
  }

  getDatesForMonth(date = new Date()) {
    const firstDateOfTheMonth = new Date(date).setDate(0);
    const lastDateOfTheMonth = new Date(date).setDate(0);

    return [firstDate];
  }

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
