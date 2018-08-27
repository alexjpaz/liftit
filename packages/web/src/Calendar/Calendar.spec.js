import React from 'react';

import Calendar from './Calendar';

import { shallow } from 'enzyme';

describe('<Calendar />', () => {
  it('should shallow mount', () => {
    shallow(<Calendar  />);
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

  it('should generate day components', () => {
    const tests = [
      { date: "2018-08-01", days: 31 },
      { date: "2018-07-07", days: 31 },
      { date: "2018-07-06", days: 31 },
      { date: "2018-01-06", days: 31 },
      { date: "2018-02-06", days: 28 },
      { date: "2016-02-06", days: 29 },
    ];

    tests.forEach((tt) => {
      const testDate = new Date(tt.date);
      const components = calendar.generateDays(testDate);
      expect(components).toHaveLength(tt.days);
    });
  })
});
