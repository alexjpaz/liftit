<log-add>
    <form onsubmit={submit}>
       <div class="form-group">
        <label>Date</label>
        <input class="form-control" type="date" id="sample1" name='date' onchange={ model }>
      </div>

      <div class="form-group">
        <label>Lift</label>
        <select name='lift' class='form-control' onchange={model}>
          <option>-- select lift --</option>
          <option value='press'>press</option>
          <option value='deadlift'>deadlift</option>
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

  <pre>{ JSON.stringify(this.vm, null, 4) }</pre>

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
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, self.vm));
      riot.route('/logs');
    };

    var route = riot.route.create();

    route('/logs/*', function(key) {
      var event = store.events[key];

      if(!event) {
        event = {
          key: store.guid(),
          date: self.api.DateUtils.create(),
          type: 'log'
        }
      }

      self.vm = Object.assign({}, event);
      self.update();
    });

  </script>
</log-add>
