import * as workbookReducers from './WorkbookReducers';

import workbook from './__test_data__/data';

describe('WorkbookReducers', () => {
  describe('basic', () => {
    it('should get all', () => {
      const { getAll } = workbookReducers;
      expect(getAll).toBeDefined();

      let entries = [
        { id: 1 },
        { id: 2 },
      ];

      let items = getAll(entries);

      expect(items).toHaveLength(2);
      expect(items.find(i => i.id === 1)).toBeDefined();
      expect(items.find(i => i.id === 2)).toBeDefined();
    });
  });

  describe('filtering', () => {
    it('should filter by type', () => {
      const { isType } = workbookReducers;
      expect(isType).toBeDefined();

      expect(isType('log')({type: 'log'})).toEqual(true);
      expect(isType('foo')({type: 'bar'})).toEqual(false);
    });

    it('should get active entries', () => {
      const { getActive } = workbookReducers;
      expect(getActive).toBeDefined();

      let entries = [
        { id: 1 },
        { _deleted: true }
      ];

      let items = null;

      items = getActive(entries);
      expect(items).toHaveLength(1);
      expect(items[0].id).toEqual(1);
    });

    it('should get active type', () => {
      const { getActiveType } = workbookReducers;
      expect(getActiveType).toBeDefined();

      let entries = [
        { id: 1 },
        { id: 2, type: 'log' },
        { _deleted: true }
      ];

      let items = getActiveType('log', entries);

      expect(items).toHaveLength(1);
      expect(items[0].id).toEqual(2);
    });


    it('should get cycles', () => {
      const { getActiveType } = workbookReducers;
      expect(getActiveType).toBeDefined();
      const items = workbookReducers.getCycles([{
        id: 1,
        type: 'cycle'
      }, {
        type: 'log'
      }]);

      expect(items).toHaveLength(1);
      expect(items[0].id).toEqual(1);
    });

    it('should detect empty type', () => {
      const { hasEmptyType } = workbookReducers;

      const items = [{ type: 'foo' }];

      const result = hasEmptyType('log', items);

      expect(result).toEqual(true);
    });

    describe('dates', () => {
      describe('isOnDate', () => {
        const { isOnDate } = workbookReducers;
        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isOnDate("2018-01-01")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-02" };
          const result = isOnDate("2018-01-01")(item);
          expect(result).toEqual(false);
        });
      });

      describe('isBeforeDate', () => {
        const { isBeforeDate } = workbookReducers;
        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isBeforeDate("2018-01-02")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-02" };
          const result = isBeforeDate("2018-01-01")(item);
          expect(result).toEqual(false);
        });
      });

      describe('isOnOrBeforeDate', () => {
        const { isOnOrBeforeDate } = workbookReducers;
        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isOnOrBeforeDate("2018-01-02")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isOnOrBeforeDate("2018-01-01")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-02" };
          const result = isOnOrBeforeDate("2018-01-01")(item);
          expect(result).toEqual(false);
        });
      });

      describe('isOnOrAfterDate', () => {
        const { isOnOrAfterDate } = workbookReducers;
        it('', () => {
          const item = { date: "2018-01-05" };
          const result = isOnOrAfterDate("2018-01-02")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isOnOrAfterDate("2018-01-01")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isOnOrAfterDate("2018-01-10")(item);
          expect(result).toEqual(false);
        });
      });

      describe('isBetweenDate', () => {
        const { isBetweenDate } = workbookReducers;
        it('', () => {
          const item = { date: "2018-01-05" };
          const result = isBetweenDate("2018-01-01", "2018-01-10")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-01" };
          const result = isBetweenDate("2018-01-01", "2018-01-10")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-01-10" };
          const result = isBetweenDate("2018-01-01", "2018-01-10")(item);
          expect(result).toEqual(true);
        });

        it('', () => {
          const item = { date: "2018-02-01" };
          const result = isBetweenDate("2018-01-01", "2018-01-10")(item);
          expect(result).toEqual(false);
        });
      });

    });
  });

  describe('sorting', () => {
    const expectIsSorted = (items, sortBy) => {
      const result = items.slice().sort(sortBy);

      const ids = result.map(i => i.id);

      const expectedOrder = Array(ids.length)
        .fill(true)
        .map((v,i) => i);

      //console.log("items:\n%o\nresults:\n%o",items, result);

      expect(ids).toEqual(expectedOrder);
    };

    describe('sortByDate', () => {
      const { sortByDate } = workbookReducers;

      const sets = {
        "empty": [],
        "same": [
          { id: 0, date: "2018-01-01" },
          { id: 1, date: "2018-01-01" },
        ],
        "date_descending": [
          { id: 1, date: "2018-01-01" },
          { id: 0, date: "2018-01-02" },
        ],
        "date_descending2": [
          { id: 0, date: "2018-01-02" },
          { id: 1, date: "2018-01-01" },
        ],
        "date_descending3": [
          { id: 2, date: "2018-01-01" },
          { id: 0, date: "2018-01-03" },
          { id: 1, date: "2018-01-02" },
        ],
        "mixed": [
          { id: 1, date: "2018-01-01" },
          { id: 2 },
          { id: 0, date: "2018-01-02" },
        ],
      };

      Object.keys(sets).map(k => {
        const set = sets[k];
        it(`should sort set "${k}"`, () => {
          expectIsSorted(set, sortByDate);
        })
      });
    })
  })

  it('should get "latest" entry', () => {
    const { getLatestOfType } = workbookReducers;
    expect(getLatestOfType).toBeDefined();

    const items = [
      { id: 2, type: 'foo', date: "2018-01-01" },
      { id: 1, type: 'foo', date: "2018-01-02" },
    ];

    const result = getLatestOfType('foo', items);

    expect(result.id).toEqual(1);
  });

  it('should get last cycle', () => {
    const { getLastCycle } = workbookReducers;
    expect(getLastCycle).toBeDefined();

    const items = [
      { id: 1, type: 'cycle', _deleted: true },
      { id: 2, type: 'cycle', }
    ];

    const result = getLastCycle(items);

    expect(result).toBeDefined();
    expect(result.id).toEqual(2);
  });

  it('should get the next cycle', () => {
    const { getNextCycle } = workbookReducers;

    const items = [
      { id: 1, type: 'cycle', date: '2018-01-01' },
      { id: 2, type: 'cycle', date: '2018-02-01' },
      { id: 3, type: 'cycle', date: '2018-03-01' },
      { id: 4, type: 'cycle', date: '2017-03-01' },
    ];

    const result = getNextCycle(items[0], items);

    expect(result).toBeDefined();
    expect(result.id).toEqual(2);

  });

  it('should get cycle logs', () => {
    const { getCycleLogs } = workbookReducers;

    expect(getCycleLogs).toBeDefined();

    const items = [
      { id: 1, type: 'cycle', date: '2018-01-01' },
      { id: 2, type: 'log', date: '2018-01-01' },
      { id: 3, type: 'log', date: '2018-01-02' },
      { id: 4, type: 'log', date: '2018-01-03' },
      { id: 6, type: 'cycle', date: '2018-02-01' },
      { id: 7, type: 'log', date: '2018-02-02' },
    ];

    const result = getCycleLogs(items[0], items);

    expect(result).toBeDefined();
    expect(result).toHaveLength(3);
    expect(result.map(i => i.id)).toContain(4);
    expect(result.map(i => i.id)).not.toContain(5);
    expect(result.map(i => i.id)).not.toContain(7);
  });



  describe('generate next log', () => {
    const { getNextLog } = workbookReducers;

    it('should get next log', () => {
      const items = [
        { id: 1, type: 'cycle', press: 100, date: '2018-01-01' },
        { id: 2, type: 'log', lift: 'deadlift', date: '2018-01-01' },
      ];

      const nextLog = getNextLog(items);

      expect(nextLog).toBeDefined();
      expect(nextLog.cycle.id).toEqual(1);
      expect(nextLog.lift).toEqual('press');
      expect(nextLog.week).toEqual('3x3');
      expect(nextLog.minimumReps).toEqual(3);
      expect(nextLog.targetReps).toEqual(5);
      expect(nextLog.weight).toEqual(90);
    });

    it('should get next log', () => {
      const items = [
        { id: 1, type: 'cycle', squat: 100, date: '2018-01-01' },
        { id: 2, type: 'log', lift: 'press', date: '2018-01-01' },
      ];

      const nextLog = getNextLog(items);

      expect(nextLog).toBeDefined();
      expect(nextLog.cycle.id).toEqual(1);
      expect(nextLog.lift).toEqual('squat');
      expect(nextLog.week).toEqual('3x5');
      expect(nextLog.minimumReps).toEqual(5);
      expect(nextLog.targetReps).toEqual(8);
      expect(nextLog.weight).toEqual(85);
    });

    it('should get next log', () => {
      const items = [
        { id: 1, type: 'cycle', press: 100, date: '2018-01-01' },
      ];

      const nextLog = getNextLog(items);

      expect(nextLog).toBeDefined();
      expect(nextLog.cycle.id).toEqual(1);
      expect(nextLog.lift).toEqual('press');
      expect(nextLog.week).toEqual('3x5');
      expect(nextLog.minimumReps).toEqual(5);
      expect(nextLog.targetReps).toEqual(8);
      expect(nextLog.weight).toEqual(85);
    });
  });

});
