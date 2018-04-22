export default class Workbook {
  hasEmptyCycles(entries) {
    return entries
      .filter((item) => item.type === 'cycle')
      .filter(item => !item._deleted)
      .length === 0;
  }

  hasEmptyLogs(entries) {
    return entries
      .filter((item) => item.type === 'log')
      .filter(item => !item._deleted)
      .length === 0;
  }

  getLastLog(entries) {
    return entries
        .filter((item) => item.type === 'log')
        .filter(item => !item._deleted)
        .sort((a,b) => {
          a = new Date(a.date);
          b = new Date(b.date);
          return b-a;
        })
        .map((f) => {
          return f;
        })
        .find((item) => item)
      ;
  }

  getLastCycle(entries) {
    return entries
      .filter((item) => item.type === 'cycle')
      .filter(item => !item._deleted)
      .sort((a,b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return b-a;
      })
      .map((f) => {
        return f;
      })
      .find((item) => item)
    ;
  }

  getNextLog(entries) {
    const cycle = this.getLastCycle(entries);

    const nextLog = {
      lift: 'press',
      minimumReps: 3,
      targetReps: 8,
      weight: 145,
      week: "3x3",
      cycle,
    };
    return nextLog;
  }
}
