var Event = require('../../models/Event');
<dashboard-calendar>
<div>
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
    <div class='col day isToday--{ d.isToday != false }' each={ d in days }>
      { d.label }
      <span each={ e in d.events } class='badge badge-default badge-{e.type}'>
        <a if={ e.type === 'log' } href='#/logs/{e.key}'>{ e.type[0].toUpperCase() }</a>
        <a if={ e.type === 'max' } href='#/maxes/{e.key}'>{ e.type[0].toUpperCase() }</a>
      </span>
    </div>
  </div>

</div>
  <style scoped>
    dashboard-calendar {
      display: block;
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

    function update() {
      var now = new Date();
      var today = new Date();
      today.setHours(0,0,0,0);
      var date = new Date();
      self.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

      this.days = Array(self.firstDay.getDay());

      var dateDay = 1;
      for(var i=this.days.length; i < daysInThisMonth() + self.firstDay.getDay(); i++) {
        var cursorDate = new Date(date.getFullYear(), date.getMonth(), dateDay)
        cursorDate.setHours(0,0,0,0);

        dateDay = (i+1)-self.firstDay.getDay();
        this.days[i] = {
          label: dateDay,
          events: Event.findOn(new Date(date.getFullYear(), date.getMonth(), dateDay)),
          isToday: false
         };

        if(today.getTime() === cursorDate.getTime()) {
          this.days[i].isToday = true;
        }
      }



      function daysInThisMonth() {
        return daysInMonth(new Date().getMonth(), new Date().getYear());
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
