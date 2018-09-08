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

  it.only('should get the current date', async  () => {
    const currentDate = calendar.getCurrentDate();
    const truncateDate = (d) => d.toISOString().slice(0, 12);
    await new Promise(r => setTimeout(r, 100));
    expect(truncateDate(currentDate)).toEqual(truncateDate(new Date()));
  });

  describe('should get the first day of the month', () => {
    const tests = [
      { date: "2018-08-01", firstDate: "2018-08-01"},
      { date: "2018-07-01", firstDate: "2018-07-01"},
      { date: "2018-07-07", firstDate: "2018-07-01"},
      { date: "2018-08-02", firstDate: "2018-08-01"},
      { date: "2016-02-29", firstDate: "2016-02-01"},
    ];

    tests.forEach((tt) => {
      test(`${tt.date} => ${tt.firstDate}`, () => {
        const testDate = new Date(tt.date);
        const firstDate = calendar.getFirstDay(testDate);
        expect(firstDate.toISOString().slice(0,10)).toEqual(tt.firstDate);
      });
    });
  });

  describe('should get the number of days in the month', () => {
    const tests = [
      { date: "2018-07-07", days: 31 },
      { date: "2018-07-06", days: 31 },
      { date: "2018-01-06", days: 31 },
      { date: "2018-02-06", days: 28 },
      { date: "2016-02-06", days: 29 },
    ];

    tests.forEach((tt) => {
      it(`${tt.date} => ${tt.days}`, () => {
        const testDate = new Date(tt.date);
        const daysInTheMonth = calendar.getNumberOfDaysInTheMonthOf(testDate);

        expect(daysInTheMonth).toEqual(tt.days);
      });
    });
  });

  describe('should generate day components', () => {
    const tests = [
      { date: "2018-08-01", days: 31 },
      { date: "2018-08-02", days: 31 },
      { date: "2018-09-02", days: 30 },
      { date: "2017-07-07", days: 31 },
      { date: "2018-07-06", days: 31 },
      { date: "2018-01-06", days: 31 },
      { date: "2018-02-06", days: 28 },
      { date: "2016-02-06", days: 29 },
    ];

    tests.forEach((tt) => {
      it(`${tt.date} => ${tt.days}`, () => {
        const testDate = new Date(tt.date);
        let components = calendar.generateDays(testDate);
        components = components.filter(c => !!c.props.date);

        // Should be the  correct month
        expect(components[0].props.date.toISOString().slice(0,7)).toEqual(testDate.toISOString().slice(0,7));

        expect(components).toHaveLength(tt.days);

        const firstDate = shallow(components[0]);
        const lastDate = shallow(components[components.length-1]);
        expect(firstDate.instance().dayOfTheMonth).toEqual(1);
        try {
        expect(lastDate.instance().dayOfTheMonth).toEqual(tt.days);
        } catch(e) {
          console.log(lastDate.instance());
          throw e;
        }
      });
    });
  })
});
