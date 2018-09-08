import React from 'react';

import './Calendar.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';
import Info from './Info';

export default class Calendar extends React.Component {
  getCurrentDate() {
    return new Date();
  }

  getFirstDay(date = new Date()) {
    const clonedDate = new Date(date);

    let firstDay = clonedDate;

    // WTF Javascript - if we don't then it rolls back to the previous month
    if(!this.isFirstDayOfTheMonth(firstDay)) {
      firstDay = new Date(clonedDate.getFullYear(), clonedDate.getMonth(), 1);
    }

    return firstDay;
  }

  isFirstDayOfTheMonth(date = new Date()) {
    return date.toISOString().slice(8,10) === '01';
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
    const firstDay  = this.getFirstDay(date);

    const offset = firstDay.getDay();

    let components = Array(offset).fill(<Day />);

    for(let i=offset;i<daysInTheMonth+offset;i++) {
      let date = new Date(firstDay);

      if(i !== offset) {
        date = new Date(firstDay.getFullYear(), firstDay.getMonth(), i + 1 - offset);
      }

      components.push(<Day date={date} />);
    }

    return components;
  }

  render() {
    const days = this.generateDays();
    return (
      <div>
        <div className='Calendar'>
          <WeekHeader />
          {days}
        </div>
        <Info />
      </div>
    )
  }
}
