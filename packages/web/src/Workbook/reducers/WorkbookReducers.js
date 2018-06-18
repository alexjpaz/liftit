import { Ring } from './Ring';

import liftit from 'liftit-common';

export const getAll = (entries) => entries || [];

export const findAny = (item) => item;

export const findById = (id) => (
  (item) => item.id === id
)

export const isType = (type) => (item) => (
  item.type === type
);

export const isLog = isType('log');

export const isCycle = isType('cycle');

export const isActive = (item) => !item._deleted;

export const isEmpty = (items) => (
  items.length === 0
)

export const isNullOrEmpty = (items) => (
  items === null || items === undefined || isEmpty(items)
)

export const isOnDate = (date) => (
  (item) => item.date === date
);

export const isBeforeDate = (date) => (
  (item) => item.date < date
);

export const isAfterDate = (date) => (
  (item) => item.date > date
);

export const isOnOrBeforeDate = (date) => (
  (item) => item.date <= date
);

export const isOnOrAfterDate = (date) => (
  (item) => item.date >= date
);

export const isBetweenDate = (start, end) => (
  (item) => item.date >= start && item.date <= end
)

export const getType = (type, entries) => {
  return entries
    .filter((item) => item.type === type)
}
export const getActive = (entries) => (
  entries.filter(isActive)
)

export const getActiveType = (type, entries) => (
  entries
    .filter(isActive)
    .filter(isType(type))
)

export const getCycles = (entries) => {
  return entries
    .filter(isActive)
    .filter(isCycle)
}
export const getLogs = (entries) => {
  return getAll(entries)
    .filter(isActive)
    .filter(isLog)
}

export const hasEmptyType = (type, entries) => (
  isEmpty(entries
    .filter(isActive)
    .filter(isType(type)))
)

export const hasEmptyCycles = (entries) => (
  hasEmptyType('cycle', entries)
)

export const hasEmptyLogs = (entries) => (
  hasEmptyType('log', entries)
)

export const sortByDate = (a,b) => {
  if(!a.date && b.date) return 1;
  if(!a.date && !b.date) return 0;
  if(a.date && !b.date) return -1;

  if(a.date > b.date) return -1;
  if(a.date === b.date) return 0;
  if(a.date < b.date) return 1;
}

export const getLatestOfType = (type, entries) => (
  entries
    .filter(isActive)
    .filter(isType(type))
    .sort(sortByDate)
    .find(a => a)
)

export const getLastLog = (entries) => (
  getLatestOfType('log', entries)
)

export const getLastCycle = (entries) => (
  getLatestOfType('cycle', entries)
)

export const getNextCycle = (cycle = {}, entries = []) => (
  entries
    .filter(isActive)
    .filter(isCycle)
    .filter(isAfterDate(cycle.date))
    .find(i => i)
)

export const getCycleLogs = (cycle, entries) => {
  let nextCycle = getNextCycle(cycle, entries);

  let date = cycle ? cycle.date : null;

  return entries
    .filter(isActive)
    .filter(isLog)
    .filter(isOnOrAfterDate(date))
    .filter((item) => {
      if(!nextCycle) {
        return item;
      }

      return isBeforeDate(nextCycle.date)(item);
    })
}

export const getMinimumReps = (week) => {
  const reps = {
    "3x5": 5,
    "3x3": 3,
    "531": 1
  };

  return reps[week];
}

export const getWeight = (max, week) => {
  // TODO: use lifit calculator
  const fractions = {
    "3x5": 0.85,
    "3x3": 0.9,
    "531": 0.95
  };

  return fractions[week] * max;
}

export const getTargetReps = (cycle, lastLog, week) => {
  // TODO: use lifit calculator
  const reps = {
    "3x5": 8,
    "3x3": 5,
    "531": 3
  };

  return reps[week];
};

export  const getNextLog = (entries) => {
  if(isNullOrEmpty(entries)) return;

  const cycle = getLastCycle(entries);
  const logs = getCycleLogs(cycle, entries)
    .sort(sortByDate);

  if(!cycle) return;

  const lifts = new Ring(['press','squat','bench','deadlift']);
  const weeks = new Ring(['3x5','3x3','531']);

  let lastLog = logs[0];

  let week = '3x5';
  let lift = 'press';

  if(lastLog) {
    lift = lifts.next(lastLog.lift);

    if(lifts.isLast(lastLog.lift)) {
      week = weeks.next(week);

    }
  }

  const minimumReps = getMinimumReps(week);
  const weight = getWeight(cycle[lift], week);
  const targetReps = getTargetReps(cycle, lastLog, week);

  const nextLog = {
    lift,
    weight,
    minimumReps,
    targetReps,
    week,
    cycle
  };

  return nextLog;
}

export const getLogFrom = (fromLog) => {
  const log = {} 

  if(fromLog.fraction) {
    log.lift = fromLog.lift;
    log.reps = 8 // TODO: calc
    log.weight = liftit.roundTo(fromLog.cycle * (fromLog.fraction / 100), 5);
  } else {
    log.lift = fromLog.lift;
    log.weight = fromLog.weight;
    log.reps = fromLog.targetReps;
  }

  return log;
}
