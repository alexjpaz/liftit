<max-add>
  <form onsubmit={submit}>
     <div class="form-group">
      <label>Date</label>
      <input class="form-control" type="date" id="sample1" name='date' onchange={ model }>
    </div>

    <div class="form-group" each={l in lifts}>
      <label>{ l }</label>
      <input class="form-control" type="number" id="sample1" name={l} onchange={ model }>
    </div>

    <button class="btn btn-primary">
      Store Max
    </button>
  </form>
  <pre>{ JSON.stringify(this.vm) }</pre>

  <script>
    var self = this;

    this.mixin('api');

    var store = self.api.store;

    this.lifts = ['press','deadlift','bench','squat'];

    var route = riot.route.create();

    route('/maxes/*', function(key) {
      var event = store.events[key];

      if(!event) {
        event = {
          key: store.guid(),
          date: self.api.DateUtils.create(),
          type: 'max'
        }
      }

      self.vm = Object.assign({}, event);
      self.update();
    });


    this.model = function(e) {
      self.vm[e.target.name] = e.target.value;
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, self.vm));
    };
  </script>
</max-add>
