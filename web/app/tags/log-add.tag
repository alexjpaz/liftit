<log-add>
  <form onsubmit={submit}>
     <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="date" id="sample1" name='date' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Date...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <select name='lift' onchange={model}>
        <option>-- select lift --</option>
        <option value='press'>press</option>
        <option value='deadlift'>deadlift</option>
      </select>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="sample1" value={ vm.weight} name='weight' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Text...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="sample1" value={ vm.reps } name='reps' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Text...</label>
    </div>

    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
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
          date: opts.api.DateUtils.create(),
          type: 'log'
        }
      }

      self.vm = Object.assign({}, event);
      self.update();
    });

  </script>
</log-add>
