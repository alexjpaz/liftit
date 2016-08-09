var Event = require('../../models/Event');
var Cycle = require('../../models/Cycle');
var DateUtils = require('../../date');
var Form = require('../../form');

<max-add>
  <div class='panel panel-default'>
    <div class='panel-heading'>
      Max
    </div>
    <div class='panel-body'>
      <form onsubmit={submit}>
         <div class="form-group">
          <label>Date</label>
          <input class="form-control" type="date" name='date' value={ formatDateView(vm.date) } onchange={ model }>
        </div>

        <div class="form-group" each={l in lifts}>
          <label>{ l }</label>
          <input class="form-control" type="number" name={l} value={vm[l]} onchange={ model } required>
        </div>

        <button class="btn btn-primary">
          Store Max
        </button>

        <button class="btn btn-danger pull-right" onclick={ remove }>
          Remove
        </button>
      </form>
    </div>
  </div>

  <hr />

  <a href='http://liftit-sheets.alexjpaz.com/531bbb/?press={ vm.press }&deadlift={ vm.deadlift }&bench={vm.bench}&squat={vm.squat}' target='_blank'>View Cycle Sheet</a>

  <script>
    var self = this;

    this.mixin('api');

    var store = self.api.store;

    this.lifts = ['press','deadlift','bench','squat'];

    var route = riot.route.create();

    route('/maxes/*', function(key) {
      var event = store.events[key];

      var cycle = new Cycle(event);

      self.vm = cycle;

      self.update();
    });

    route('/maxes/new...', function() {
      var cycle = null;

      var today = riot.route.query().date;

      if(today) {
        var cyclesBeforeToday = Cycle.findBefore(today);

        if(cyclesBeforeToday[0]) {
          cycle = Cycle.nextCycleFrom(cyclesBeforeToday[0]);
          cycle.date = today;
        }
      } else {
        today = DateUtils.create();
      }

      if(cycle === null) {
        cycle = new Cycle({
          date: today
        });
      }

      cycle.date = new Date(cycle.date).toISOString();

      self.vm = cycle;
      self.update();
    });

    this.formatDateView = Form.formatDateView;

    this.model = function(e) {
      self.vm[e.target.name] = Form.parseValue(e);
    };

    this.submit = function(form) {
      form.preventDefault();

      store.trigger('updateEvents', self.vm);

      window.history.back();
    };

    this.remove = function(form) {
      form.preventDefault();
      var ans = confirm("Are you sure you want to remove this cycle?");
      if(ans) {
        self.vm.disabled = true;
        store.trigger('updateEvents', self.vm);
        window.history.back();
      }
    };
  </script>
</max-add>
