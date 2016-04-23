var Cycle = require('../models/Cycle');

<max-add>
  <div class='panel panel-default'>
    <div class='panel-heading'>
      Max
    </div>
    <div class='panel-body'>
      <form onsubmit={submit}>
         <div class="form-group">
          <label>Date</label>
          <input class="form-control" type="date" name='date' value={ vm.date } onchange={ model }>
        </div>

        <div class="form-group" each={l in lifts}>
          <label>{ l }</label>
          <input class="form-control" type="number" name={l} value={vm[l]} onchange={ model }>
        </div>

        <button class="btn btn-primary">
          Store Max
        </button>

        <button class="btn btn-primary" onclick={ remove }>
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
      self.vm = new Cycle({
        date: riot.route.query().date
      });

      self.update();
    });


    this.model = function(e) {
      self.vm[e.target.name] = e.target.value;
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, self.vm));
      window.history.back();
    };

    this.remove = function(form) {
      form.preventDefault();
      store.trigger('removeEvent', self.vm.key);
      window.history.back();
    };
  </script>
</max-add>
