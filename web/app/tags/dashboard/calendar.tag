<dashboard-calendar>
<div>
  <div class='row'>
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
  <div class='row'>
    <div class='col day' each={ d in days }>{ d.label }</div>
  </div>

</div>
  <style scoped>
    dashboard-calendar {
      display: block;
    }

    .row {
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

    .day-of-week {
      text-align: center;
    }

    month {
      display: block;
      border: 1px #aaa solid;
    }
  </style>
  <script>
    this.days = [];

    for(var i=0; i < daysInThisMonth(); i++) {
      this.days[i] = {
        label: i+1
      };
    }

    function daysInThisMonth() {
      return daysInMonth(new Date().getMonth(), new Date().getYear());
    }

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }
  </script>
</dashboard-calendar>
