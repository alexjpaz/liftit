var liftit = require('liftit-common');

var utils = require('../../reducers/utils')

var Log = require('../../models/Log');
var Cycle = require('../../models/Cycle');

<log-add>
  <div class='panel panel-danger' if={!effectiveMax}>
    <div class='panel-heading'>
      no cycle
    </div>
  </div>
  <div class='panel panel-default' if={effectiveMax}>
    <div class='panel-heading'>
      Log
    </div>
    <div class='panel-body'>
    <form onsubmit={submit}>
       <div class="form-group">
        <label>Date</label>
        <input class="form-control" type="date" id="sample1" name='date' onchange={ model } value={ vm.date } />
      </div>

      <div class="form-group">
        <label>Lift</label>
        <select name='lift' class='form-control' onchange={model}>
          <option>-- select lift --</option>
          <option each={ l in lifts } value={ l } selected={ vm.lift === l }>{ l }</option>
        </select>
      </div>

      <div class="form-group weight-control">
        <label>Weight</label>
        <div class='clearfix'>
          <input name='weight' class='form-control' value={vm.weight} onchange={model}>
          <select name='weight' class='form-control' onchange={model}>
            <option>?</option>
            <option each={ wf in weightFractions } value={ wf.weight } selected={ vm.weight == wf.weight }>{ wf.fraction  }%</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Reps</label>
        <select name='reps' class='form-control' onchange={model}>
          <option>-- select reps --</option>
          <option selected={r == vm.reps} value={r} each={ r in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] }>{r}</option>
        </select>
      </div>

      <button class="btn btn-primary">
        Store Log
      </button>

      <button class="btn btn-danger pull-right" onclick={ remove }>
        Remove
      </button>
    </form>
    </div>
  </div>

  <div class='panel panel-default'>
    <div class='panel-body'>
      <table>
        <tr>
          <th>Max</th>
          <td>
            <span>{ effectiveMax[vm.lift] }</span>
            <span>({ (effectiveMax[vm.lift] / vm.weight) * 100 }%)</span>
            <a href="#/maxes/{ effectiveMax.key }">View Cycle</a>
          </td>
        </tr>
        <tr>
          <th>Work</th>
          <td>
            { vm.getWork() }
          </td>
        </tr>
        <tr>
          <th>Rep Goal</th>
          <td>
            <p>Need at least <strong>{ vm.getRepGoal() }</strong> reps to reach the goal for this week.</p>
            <p>To reach the Max you will need <strong>{ vm.getRepsToMax() }</strong> reps.</p>
            <p>Your last attempt was <strong>{ vm.getLastAttempt() }</strong> reps.</p>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <style>
    select {
      border: 1px solid;
    width: 100%;
      border-radius: 0;
        background: none;
    }

    log-add table th {
      vertical-align: top;
      padding-right: 10px;
    }

    .weight-control {
    }

    .weight-control input {
      float: left;
      width: 70%;
    }

    .weight-control select {
      float: left;
      width: 30%;
    }

  </style>

  <script>
    var self = this;

    this.liftit = liftit;

    this.lifts = ['press','deadlift','bench','squat'];

    this.mixin('api');

    var store = this.api.store;

    this.model = function(e) {
      var  value = e.target.value;

      self.vm[e.target.name] = value;
      self.effectiveMax = this.vm.getEffectiveMax();

      calculateWeigthFractions();

      self.update();
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, self.vm));
      window.history.back();
    };

    this.remove = function(form) {
      form.preventDefault();
      var ans = confirm("Are you sure you want to remove this log?");
      if(ans) {
        store.trigger('removeEvent', self.vm.key);
        window.history.back();
      }
    };

    function calculateWeigthFractions() {
      self.weightFractions = [];

      for(var i=0.65;i<1;i+=0.05) {
        self.weightFractions.push({
          weight: liftit.roundTo(self.effectiveMax[self.vm.lift] * i, 5),
          fraction: Math.floor(i * 100),
        });
      }
    };




    var route = riot.route.create();

    route('/logs/*', function(key) {
      var event = store.events[key];

      console.log(2222, Log)
      var log = new Log(event);
      self.vm = log;

      self.effectiveMax = log.getEffectiveMax();

      calculateWeigthFractions();

      self.update();

    });


    route('/logs/new...', function() {
      self.vm = new Log({
        date: riot.route.query().date
      });
      console.log(riot.route.query())
      self.effectiveMax = self.vm.getEffectiveMax();
      self.update();
    });

    var getParameterByName = function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  </script>
</log-add>
