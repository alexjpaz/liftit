var utils = require('../reducers/utils')

var Log = require('../models/Log');
var Cycle = require('../models/Cycle');

<log-add>
  <div class='panel panel-default'>
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
          <option value='press'>press</option>
          <option value='deadlift'>deadlift</option>
          <option value='bench'>bench</option>
          <option value='squat'>squat</option>
        </select>
      </div>

      <div class="form-group">
        <label>Weight</label>
        <input class="form-control" type="text"  value={ vm.weight} name='weight' onchange={ model }>
      </div>

      <div class="form-group">
        <label>Reps</label>
        <input class="form-control" type="number"  value={ vm.reps } name='reps' onchange={ model }>
      </div>

      <button class="btn btn-primary">
        Store Log
      </button>
    </form>
    </div>
  </div>

  <div class='panel panel-default'>
    <div class='panel-body'>
    </div>
  </div>

  <pre>{ JSON.stringify(effectiveMax, null, 4) }</pre>

  <style>
    select {
      border: 1px solid;
        width: 100%;
          border-radius: 0;
            background: none;
    }
  </style>

  <script>
    var self = this;

    this.mixin('api');

    var store = this.api.store;

    this.model = function(e) {
      self.vm[e.target.name] = e.target.value;
      self.effectiveMax = this.vm.getEffectiveMax();
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, self.vm));
      riot.route('/logs');
    };

    var route = riot.route.create();

    route('/logs/*', function(key) {
      var event = store.events[key];

      var log = new Log(event);
      self.vm = log;

      self.effectiveMax = log.getEffectiveMax();

      self.update();
    });

  </script>
</log-add>
