import React from 'react';

import Calendar from './Calendar';

import { shallow } from 'enzyme';

describe('<Calendar />', () => {
  xit('should do a thing', () => {
    const wrapper = shallow((
      <Calendar  />
    ));

    expect(wrapper.html()).toContain('<div>March 2018</div>');
  });
});

describe('Calendar', () => {
  let calendar;

  beforeEach(() => {
    calendar = new Calendar();
  });

  xit('should get the current date', () => {
    const currentDate = calendar.getCurrentDate();
    expect(currentDate).toEqual(new Date());
  });

  it('should get the first day of the month', () => {
    const testDate = new Date("2018-07-07");
    const firstDate = calendar.getFirstDay(testDate);
    expect(firstDate.toISOString().slice(0,10)).toEqual("2018-07-01");
  });

  it('should get the number of days in the month', () => {
    const tests = [
      { date: "2018-07-07", days: 31 },
      { date: "2018-07-06", days: 31 },
      { date: "2018-01-06", days: 31 },
      { date: "2018-02-06", days: 28 },
      { date: "2016-02-06", days: 29 },
    ];

    tests.forEach((tt) => {
      const testDate = new Date(tt.date);
      const daysInTheMonth = calendar.getNumberOfDaysInTheMonthOf(testDate);

      expect(daysInTheMonth).toEqual(tt.days);
    });
  });

  xit('should return all dates in the current month', () => {
    const tests = [
      { date: "2018-07-07", days: 30 },
    ]

    tests.forEach(() => {
      const today = new Date("2018-07-07");
      const todayClone = new Date(today);
      const dates = calendar.getDatesForMonth(today);

      expect(dates.length).not.toEqual(0);
      expect(today).toEqual(todayClone);
    });
  });
});
