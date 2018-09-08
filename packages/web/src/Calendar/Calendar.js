import React from 'react';

import './Calendar.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';
import Info from './Info';

export default class Calendar extends React.Component {
  getCurrentDate() {
    console.log(this);
    console.log(this.props);
    if(this.props.date) {
      return this.props.date;
    }

    return new Date();
  }

  getFirstDay(date = this.getCurrentDate()) {
    const clonedDate = new Date(date);

    let firstDay = clonedDate;

    // WTF Javascript - if we don't then it rolls back to the previous month
    if(!this.isFirstDayOfTheMonth(firstDay)) {
      firstDay = new Date(clonedDate.getFullYear(), clonedDate.getMonth(), 1);
    }

    return firstDay;
  }

  isFirstDayOfTheMonth(date = this.getCurrentDate()) {
    return date.toISOString().slice(8,10) === '01';
  }

  getNumberOfDaysInTheMonthOf(date = this.getCurrentDate()) {
    const month = date.getMonth()+1;
    const year = date.getYear();

    const targetDate = new Date(year, month, 0);

    const days = targetDate.getDate();

    return days;
  }

  getDatesForMonth(date = this.getCurrentDate()) {
    const firstDateOfTheMonth = this.getFirstDay(date);
    const lastDateOfTheMonth = new Date(date).setDate(0);

    return [firstDate];
  }

  generateDays(date = this.getCurrentDate()) {
    const daysInTheMonth = this.getNumberOfDaysInTheMonthOf(date); 
    const firstDay  = this.getFirstDay(date);

    const offset = firstDay.getDay();

    let components = Array(offset).fill(<Day />);

    const bindOnSelectDay = (e) => {
      return () => {
        this.props.onSelectDay(e);
      };
    };

    for(let i=offset;i<daysInTheMonth+offset;i++) {
      let date = new Date(firstDay);

      if(i !== offset) {
        date = new Date(firstDay.getFullYear(), firstDay.getMonth(), i + 1 - offset);
      }

      components.push(<Day date={date} onSelect={bindOnSelectDay(date)} />);
    }

    return components;
  }

  render() {
    let days = this.generateDays();

    return (
      <div>
        <div className='Calendar'>
          <WeekHeader />
          {days}
        </div>
        <Info date={this.getCurrentDate()}/>
      </div>
    )
  }
}
