var Event = require('../../models/Event');
var DateUtils = require('../../date');

require('./today-max.tag');
require('./today-table.tag');

require('./max-fraction.tag');

<dashboard-timeline>
  <style scoped>
    .flash { animation-duration: 2s; }
    .flash--press { animation-name: flash_red; }
    .flash--deadlift { animation-name: flash_green; }
    .flash--bench { animation-name: flash_blue; }
    .flash--squat { animation-name: flash_orange; }

    @keyframes flash_red {
        from {
            border-color: red;
            background-color: red;
        }
    }

    @keyframes flash_green {
        from {
            border-color: green;
            background-color: green;
        }
    }

    @keyframes flash_blue {
        from {
            border-color: blue;
            background-color: blue;
        }
    }

    @keyframes flash_orange {
        from {
            border-color: orange;
            background-color: orange;
        }
    }

  </style>
  <div>
    <div class='pull-right'>
        <dashboard-today-table></dashboard-today-table>
    </div>
    <h4>Today</h4>
  </div>
  <hr />
  <div class='list-container'>
     <div onclick={navigateToEvent(e)} each={ e in todayEvents } class='list flash flash--{e.lift}'>
        <div class='pull-right'>
           <span>{e.date.slice(0,10)}</span>
        </div>
        <div if={ e.type ==='log'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/logs/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.lift } { e.weight }x{ e.reps } /</span>
          <max-fraction log={e}></max-fraction>
        </div>
        <div if={ e.type ==='max'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/maxes/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }</span>
        </div>
      </div>

    </div>
  </div>

  <h4>Upcoming Events</h4>
  <hr />
  <div class='list-container'>
     <div onclick={navigateToEvent(e)} each={ e in futureEvents } class='list'>
        <div class='pull-right'>
           <span>{e.date.slice(0,10)}</span>
        </div>
        <div if={ e.type ==='log'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/logs/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.lift } { e.weight }x{ e.reps } /</span>
          <max-fraction log={e}></max-fraction>
        </div>
        <div if={ e.type ==='max'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/maxes/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }</span>
        </div>
      </div>

    </div>
  </div>

  <h4>Past Events</h4>
  <hr />
  <div class='list-container'>
     <div onclick={navigateToEvent(e)} each={ e in pastEvents } class='list'>
        <div class='pull-right'>
           <span>{e.date.slice(0,10)}</span>
        </div>
        <div if={ e.type ==='log'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/logs/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.lift } { e.weight }x{ e.reps } /</span>
          <max-fraction log={e}></max-fraction>
        </div>
        <div if={ e.type ==='max'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/maxes/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }</span>
        </div>
      </div>

    </div>
  </div>
  <script>
    var self = this;
    this.mixin('api');

    var route = riot.route.create();

    self.today = DateUtils.create().slice(0,10);

    self.pastEventsLimit = 10;

    function getThings() {
      self.todayEvents = Event.findOn(self.today);

      self.futureEvents = Event.findAfterExclusive(self.today);
      self.futureEvents.reverse();
      self.futureEvents = self.futureEvents.slice(0,6);

      self.pastEvents = Event.findBefore(self.today);
      self.pastEvents = self.pastEvents.slice(1,self.pastEventsLimit);
      self.update();
    }

    self.navigateToEvent = function(event) {
      return function(input_event) {
        var url = "";

        if(event.type === 'log') {
          url = '/logs/'+event.key
        }

        if(event.type === 'max') {
          url = '/maxes/'+event.key
        }

        riot.route(url);
      }
    };

     route('/', getThings);
  </script>

</dashboard-timeline>
