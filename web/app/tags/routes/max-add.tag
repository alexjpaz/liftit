var Event = require('../../models/Event');
var Cycle = require('../../models/Cycle');
var DateUtils = require('../../date');
var Form = require('../../form');
var liftit = require('liftit-common');

<max-add>
  <div class='panel panel-default'>
    <div class='panel-heading'>
      Max

      <a class='pull-right' onclick={toggleEditMode}>
        <i class='glyphicon glyphicon-pencil'></i>
      </a>
    </div>
    <div class='panel-body'>
      <form onsubmit={submit}>
         <div class="form-group">
          <label>Date</label>
          <input class="form-control" type="date" name='date' value={ formatDateView(vm.date) } onchange={ model } readonly={!editing}>
        </div>

        <div class="form-group" each={l in lifts}>
          <label>{ l } <small class='text-muted'>{cyclePreviousFractions[l]}%</small></label>
          <a href='#/tools/table?weight={vm[l]}&lift={l}' class='pull-right'><i class='glyphicon glyphicon-list-alt'></i></a>
          <input class="form-control" type="number" name={l} value={vm[l]} onchange={ model } readonly={!editing} required>
        </div>

        <div if={editing}>
          <hr />
          <button class="btn btn-primary">
            Store Max
          </button>

          <button class="btn btn-danger pull-right" onclick={ remove }>
            Remove
          </button>
        </div>
      </form>
    </div>
  </div>

  <hr />

  <a href='http://liftit-sheets.alexjpaz.com/531bbb/?press={ vm.press }&deadlift={ vm.deadlift }&bench={vm.bench}&squat={vm.squat}' target='_blank'>View Cycle Sheet</a>

  <hr />

  <nav>
  <ul class="pager">
    <li if={cyclePrevious} class="previous"><a href="#/maxes/{cyclePrevious.key}"><span aria-hidden="true">&larr;</span> Older</a></li>
    <li if={cycleNext} class="next {!cycleNext ? 'disabled' : ''}"><a href="#/maxes/{cycleNext.key}">Newer <span aria-hidden="true">&rarr;</span></a></li>
  </ul>
  </nav>



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

      if(cycle) {
        self.cycleNext = cycle.findNext();
        self.cyclePrevious = cycle.findPrevious();

        if(self.cyclePrevious) {
          self.cyclePreviousFractions = self.lifts.reduce(function(p, lift) {
            p[lift] = Math.floor(100 - (+self.cyclePrevious[lift] / +cycle[lift])*100) || 0
            return p;
            }, {});
        }
      }

      if(key === "new") {
        self.editing = true;
      } else {
        self.editing = false;
      }

      self.update();

    });

    route('/maxes/new..', function() {
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
      self.editing = true;
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

    this.toggleEditMode = function() {
      self.editing = !self.editing;
    };

    this.maxFractionFromPrevious = function(lift) {
      if(self.cyclePrevious) {

        var fraction = Math.floor(100 - (+vm.cyclePrevious[lift] / +vm[lift])*100) || 0;

        return fraction;
      }
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
