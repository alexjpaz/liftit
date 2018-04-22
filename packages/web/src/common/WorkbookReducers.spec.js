import WorkbookReducers from './WorkbookReducers';

describe('WorkbookReducers', () => {
  let workbookReducers;

  beforeEach(() => {
    workbookReducers = new WorkbookReducers();
  });

  it('should get last cycle', () => {
    const items = workbookReducers.getLastCycle([{
      id: 1,
      type: 'cycle',
      _deleted: true
    },{
      id: 2,
      type: 'cycle',
    }]);

    expect(items).toBeDefined();
    expect(items.id).toEqual(2);
  });

  it('should get next log', () => {
    const nextLog = workbookReducers.getNextLog([{
      id: 1,
      type: 'cycle'
    }])

    expect(nextLog).toBeDefined();
    expect(nextLog.cycle.id).toEqual(1);
    expect(nextLog.lift).toEqual('press');
    expect(nextLog.minimumReps).toEqual(3);
    //expect(nextLog.minimumReps).toEqual(8);
    expect(nextLog.week).toEqual('3x3');
    expect(nextLog.weight).toEqual(145);
  });
});
