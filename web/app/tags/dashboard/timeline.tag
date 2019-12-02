var Event = require('../../models/Event');
var DateUtils = require('../../date');

<dashboard-timeline>
  <h4>Today</h4>
  <hr />
  <div class='list-container'>
     <div onclick={navigateToEvent(e)} each={ e in todayEvents } class='list'>
        <div class='pull-right'>
           <span>{e.date.slice(0,10)}</span>
        </div>
        <div if={ e.type ==='log'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/logs/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.lift } { e.weight }x{ e.reps }</span>
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
          <span>{ e.lift } { e.weight }x{ e.reps }</span>
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
          <span>{ e.lift } { e.weight }x{ e.reps }</span>
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
