const guid = require('../web/app/guid');
const fs = require('fs');

var data = JSON.parse(fs.readFileSync('./data.json').toString());

var events = {};

events = Object.assign(events, data.PersonalRecord.reduce((p,c) => {
  let key = guid();
  let event = {};
  event.type = 'log';
  event.key = key;
  event.date = new Date(c.date).toString(); // TODO; fix time with offset
  event.lift = c.lift;
  event.reps = c.reps;
  event.weight = c.weight;
  p[key] = event;
  return p;
},{}));

events = Object.assign(events, data.Maxes.reduce((p,c) => {
  let key = guid();
  let event = {};
  event.type = 'max';
  event.key = key;
  event.date = c.date;
  event.press = c.press;
  event.deadlift = c.deadlift;
  event.bench = c.bench;
  event.squat = c.squat;
  p[key] = event;
  return p;
},{}));

console.log(events);

var output = {
  events: events
};

fs.writeFileSync('lifit.json', JSON.stringify(output));
