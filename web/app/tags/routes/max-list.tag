var Cycle = require('../../models/Cycle');
var Event = require('../../models/Event');
var config = require('../../config');
var DateUtils = require('../../date');
var Form = require('../../form');

<max-list>
  <a href='#/cycles/schedule' class='btn btn-block btn-default'>
    <i class='glyphicon glyphicon-calendar'> </i>
    Schedule Cycles
  </a>
  <hr />
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Date</th>
        <th>Press</th>
        <th>Deadlift</th>
        <th>Bench</th>
        <th>Squat</th>
      </tr>
    </thead>
    <tbody>
      <tr class='success'>
        <td><a href='#/maxes/{ l.key }'>{ currentCycle.date }</a></td>
        <td>{ currentCycle.press }</td>
        <td>{ currentCycle.deadlift }</td>
        <td>{ currentCycle.bench }</td>
        <td>{ currentCycle.squat }</td>
      </tr>
      <tr each={ l in currentLogs } onclick={navigateToSchedule(l.key)} class='cycle--future'>
        <td><a href='#/maxes/{ l.key }'>{ formatDateView(l.date) }</a></td>
        <td>{ l.press }</td>
        <td>{ l.deadlift }</td>
        <td>{ l.bench }</td>
        <td>{ l.squat }</td>
      </tr>
    </tbody>
  </table>
  <hr />
  <div class='table-responsive'>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Date</th>
        <th>Press</th>
        <th>Deadlift</th>
        <th>Bench</th>
        <th>Squat</th>
      </tr>
    </thead>
    <tbody>
      <tr each={ row in allCycles } onclick={navigate(row.cycle.key)} class='{ row.isFutureCycle ? "cycle--future" : "" }'>
        <td><a href='#/maxes/{ row.cycle.key }'>{ formatDateView(row.cycle.date) }</a></td>
        <td each={ l in config.lifts }>
          <i class='glyphicon glyphicon-arrow-{ parent.row.percentages[l].direction }'></i>
          <span>{ parent.row.cycle[l] }</span>
          <small class='text-muted'>{ parent.row.percentages[l].value }%</small>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href='#/maxes/new'>
    Add Max
  </a>

  <style scope>
    .glyphicon-arrow-up {
      color: green;
    }

    .glyphicon-arrow-down {
      color: red;
    }

    .cycle--future {
      color: #ddd;
    }

    tr.cycle--future {
      background: #fafafa;
    }
  </style>
  <script>
    var self = this;
    self.config = config.get();

    this.mixin('api');

    this.formatDateView = Form.formatDateView;

    var store = this.api.store;

    var getLogs = function() {
      self.allCycles = [];

      var today = DateUtils.create();

      self.allCycles = Cycle.findSorted().reverse().map(function(cycle, index, array) {
        var row = {
          isFutureCycle: false,
          cycle: cycle
        };

        if(index === 0) {
          return row;
        }

        row.isFutureCycle = DateUtils.isBefore(today, cycle.date);

        var previousCycle = array[index-1];

        row.percentages = {};

        if(!store.config.lifts) {
            return row;
        }

        store.config.lifts.forEach(function(lift) {

          row.percentages[lift] = {}
          row.percentages[lift].value = Math.floor(100 - (+previousCycle[lift] / +cycle[lift])*100) || 0;

          if(row.percentages[lift].value > 0) {
            row.percentages[lift].direction = 'up';
          }


          if(row.percentages[lift].value < 0) {
            row.percentages[lift].direction = 'down';
          }
        });

        return row;
      });

      var currentCycle = Cycle.findBefore(new Date())[0];

      var currentCycleDate = new Date();

      if(!currentCycle) {
        currentCycleDate = new Date();
      }

      self.currentCycle = currentCycle;

      self.currentLogs = Cycle.findAfter(currentCycleDate).reverse();

      self.update();
    };

    self.navigateToSchedule = function(cycleKey) {
      return function() {
        riot.route('/cycles/schedule?from=' + cycleKey);
      };
    };

    self.navigate = function(key) {
      return function() {
        riot.route('/maxes/'+key);
      };
    };
    var route = riot.route.create();

    route('/maxes', getLogs);
  </script>
</max-list>
