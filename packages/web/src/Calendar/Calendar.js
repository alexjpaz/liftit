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
    const firstDateOfTheMonth = this.getFirstDay(date);
    const lastDateOfTheMonth = new Date(date).setDate(0);

    return [firstDate];
  }

  generateDays(date = new Date()) {
    const daysInTheMonth = this.getNumberOfDaysInTheMonthOf(date); 
    const firstDay  = this.getFirstDay();

    const offset = firstDay.getDay();

    let components = Array(offset).fill(<Day />);

    for(let i=offset;i<daysInTheMonth;i++) {
      components.push(<Day date={date} />);
    }

    return components;
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
