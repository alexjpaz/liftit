var Event = require('../../models/Event');
<dashboard-calendar>
<div class='row'>
  <div class='col-md-6 scrollable'>
    <div class='week'>
      <div class='day-of-week'>
        <div class='col'>S</div>
        <div class='col'>M</div>
        <div class='col'>T</div>
        <div class='col'>W</div>
        <div class='col'>T</div>
        <div class='col'>F</div>
        <div class='col'>S</div>
      </div>
    </div>
    <div class='week'>
      <div class='col day isToday--{ d.isToday != false }' each={ d in days } onclick={ selectDay(d) }>
        { d.label }
        <span each={ e in d.events } class='badge badge-default badge-{e.type}'>+
        </span>
      </div>
    </div>
  </div>
  <div class='col-md-6 scrollable'>
    <h6 style='text-align: right'>{ selectedDay.date }</h3>
    <div each={ e in selectedDay.events } class='event' onclick={ navigateToEvent(e) }>
      <span><strong>{ e.type }</strong></span>
      <span if={e.type==='max'}>
        { e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }
      </span>
      <span if={e.type==='log'}>
        { e.lift }
        { e.weight }x{ e.reps }
      </span>
    </div>
    <a href='#/logs/new'>New Log</a>
    <a href='#/maxe/new'>New Cycle</a>
  </div>
</div>
  <style scoped>
    dashboard-calendar {
      display: block;
      display: relative;
    }

    .event {
      border: 1px solid #ddd;
      padding: 4px;
      margin-top: -1px;
      padding: 8px 14px;
    }

    .scrollable {

    }

    .badge a {
      color: white;
    }

    .badge-log {
      background: blue;
    }

    .badge-max {
      background: red;
    }

    .week {
      border: 1px #eee solid;
      position: relative;
      overflow: hidden;
    }

    .col {
      float: left;
      width: 14.286%;
      border: 1px #eee solid;
    }

    .day {
      font-size: 11px;
      height: 50px;
      padding: 2px;
      color: #777;
    }

    .day.isToday--true {
      font-weight: bold;
      background: #eee;
    }

    .day-of-week {
      text-align: center;
    }

    month {
      display: block;
      border: 1px #aaa solid;
    }
  </style>
  <script>
    var self = this;

    self.selectDay = function(d) {
      return function(e) {
        self.selectedDay = d;
        self.update();
      };
    };

    self.navigateToEvent = function(event) {
      return function(e) {
        var typeUrl = null;
        if(event.type === 'log') {
          typeUrl = 'logs';
        }

        if(event.type === 'max') {
          typeUrl = 'maxes';
        }

        riot.route('/'+typeUrl+'/'+event.key);
      }
    };

    function update() {
      var now = new Date();
      var today = new Date();

      self.today = today;

      today.setHours(0,0,0,0);

      self.firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

      this.days = Array(self.firstDay.getDay());

      var dateDay = 1;
      var cursorDate = null;

      for(var i=this.days.length; i < daysInThisMonth(today) + self.firstDay.getDay(); i++) {
        cursorDate = new Date(today.getFullYear(), today.getMonth(), dateDay+1)
        cursorDate.setHours(0,0,0,0);

        dateDay = (i+1)-self.firstDay.getDay();

        this.days[i] = {
          date: cursorDate,
          label: dateDay,
          events: Event.findOn(cursorDate),
          isToday: false
         };

        if(today.getTime() === cursorDate.getTime()) {
          this.days[i].isToday = true;
          self.selectedDay = this.days[i];
        }
      }

      function daysInThisMonth(date) {
        return daysInMonth(date.getMonth()+1, date.getYear());
      }

      function daysInMonth(month,year) {
          return new Date(year, month, 0).getDate();
      }
    }

   var route = riot.route.create();

    route('/', function(key) {
      update();
      self.update();
    });

  </script>
</dashboard-calendar>
