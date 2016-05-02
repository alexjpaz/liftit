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
          <input class="form-control" type="date" name='date' value={ vm.date } onchange={ model } required />
        </div>

        <div class="form-group" each={l in config.lifts}>
          <label>{ l }</label>
          <input class="form-control" type="number" name={l} value={vm[l]} onchange={ model } required />
        </div>

        <button class="btn btn-primary">
          Save Cycle Schedule
        </button>
      </form>
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
          <tr each={ l in cycles } onclick={navigate(l.key)}>
            <td><a href='#/maxes/{ l.key }'>{ l.date }</a></td>
            <td>{ l.press }</td>
            <td>{ l.deadlift }</td>
            <td>{ l.bench }</td>
            <td>{ l.squat }</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
  <script>
    var self = this;
    this.mixin('api');
    var store = self.api.store;
    self.config = store.config;

    function generateScedule(templateCycle) {
      var repeat = 5;

      self.cycles = Array(repeat).fill(true).map(function(none, index) {
        var increment = 5; // TODO
        var cycleIncrement = 30;

        var newDate = new Date(templateCycle.date);
        newDate.setDate(newDate.getDate() + cycleIncrement * (index));

        var row = {
          date: DateUtils.string(newDate),
        };

        self.config.lifts.forEach(function(lift) {
          row[lift] = +templateCycle[lift] + (increment * (index+1));
        });

        var cycle = new Cycle(row);

        return cycle;
      });

    }

    this.model = function(e) {
      var value = e.target.value;

      if(e.target.type === 'number') {
        value = +value;
      }

      self.vm[e.target.name] = e.target.value;
      generateScedule(self.vm);
      self.update();
    };

    this.submit = function(form) {
      form.preventDefault();

      var futureCycles = Cycle.findAfter(self.vm.date);

      var eventKeysToDelete = futureCycles.map(function(cycle) {
        return cycle.key;
      });

      store.trigger('removeEvent', eventKeysToDelete);

      store.trigger('addEvent', self.cycles);

      window.history.back();
    };

    var route = riot.route.create();

    route('/cycles/schedule..', function() {
      var today = null;
      var query = riot.route.query();

      if(query.from) {
        var from = Cycle.get(query.from);
        self.vm = new Cycle(from);
        if(from) {
          today = from.date;
        }
      } else {
        if(query.date) {
          today = riot.route.query().date;
        } else {
          today = DateUtils.create();
        }
        self.vm = new Cycle({
          date: today
        });
      }

      self.today = today;

      generateScedule(self.vm);
      self.update();
    });


  </script>
</cycle-schedule>
