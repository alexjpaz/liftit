import React from 'react';

import { connect } from 'react-redux';

import './Calendar.css';

import WeekHeader from './WeekHeader';
import CurrentDateHeader from './CurrentDateHeader';
import Day from './Day';
import Info from './Info';

export class Calendar extends React.Component {
  getCurrentDate() {
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

    //return [firstDate];
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

      let events = [];

      if(this.props.events) {
        const isoDate = date.toISOString().slice(0,10);
        events = this.props.events.map((e) => {
          if(isoDate === e.date) {
            return e;
          }
        }).filter(e => e);
      }

      components.push(<Day date={date} onSelect={bindOnSelectDay(date)} events={events} />);
    }

    return components;
  }

  render() {
    let days = this.generateDays();
        console.log(this.props.events)

    return (
      <div className='Calendar'>
        <WeekHeader />
        {days}
      </div>
    )
  }
}

export const mapStateToProps = ({ entries }) => {
  let events = [];

  entries.forEach((e) => {
    console.log(e);
    //events.push(ev);
  });

  return {
    events
  };
};

export default connect(mapStateToProps)(Calendar);
