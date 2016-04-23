var Event = require('../../models/Event');
var DateUtils = require('../../date');
<dashboard-calendar>
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
          <div class='events'>
            <span each={ e in d.events } class='event event--{e.type}'></span>
          </div>
        </div>
      </div>
    </div>
  <style scoped>
    :scope {
      display: block;
      display: relative;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .events {
      position: absolute;
      top: 4px;
        right:4px;
          text-align: right;
    }

    .event {
      border-radius: 101px;
      line-height: 0;
      height: 6px;
      width: 6px;
      display: block;
      margin-bottom: 2px;
    }

    .scrollable {

    }

    .event--log {
      background: blue;
    }

    .event--max {
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
      position: relative;
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
        riot.route('/day/'+DateUtils.string(d.date));
      };
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
