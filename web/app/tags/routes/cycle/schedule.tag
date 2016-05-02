var Cycle = require('../../../models/Cycle');
var DateUtils = require('../../../date');

<cycle-schedule>
  <div class='panel panel-default'>
    <div class='panel-heading'>
      Max
    </div>
    <div class='panel-body'>
      <form onsubmit={submit}>
         <div class="form-group">
          <label>Date</label>
          <input class="form-control" type="date" name='date' value={ vm.date } onchange={ model } />
        </div>

        <div class="form-group" each={l in config.lifts}>
          <label>{ l }</label>
          <input class="form-control" type="number" name={l} value={vm[l]} onchange={ model } />
        </div>

        <button class="btn btn-primary">
          Save Cycle Schedule
        </button>
      </form>

      <pre>{ JSON.stringify(cycles, null, 2) }</pre>
    </div>

  </div>
  <script>
    var self = this;


    function generateScedule(templateCycle) {
      var repeat = 5;


      console.log(templateCycle)
      self.cycles = Array(repeat).fill(true).map(function(none, index) {
        var increment = 5; // TODO
        var cycleIncrement = 30;

        var newDate = new Date(templateCycle.date);
        newDate.setDate(newDate.getDate() + cycleIncrement * (index+1));

        var row = {
          date: DateUtils.string(newDate),
          press: templateCycle.press + (increment * (index+1)),
          deadlift: index
        };
        return row;
      });

    }

    this.mixin('api');

    var store = self.api.store;
    self.config = store.config;

    this.submit = function(form) {
      form.preventDefault();

      self.cycles.forEach(function(max) {
        store.trigger('addEvent', Object.assign({}, max));
      });

      window.history.back();
    };

    var route = riot.route.create();

    route('/cycles/schedule..', function() {
      var today = riot.route.query().date;
      generateScedule({
        date: today,
        press: 100
      });
      self.update();
    });


  </script>
</cycle-schedule>
