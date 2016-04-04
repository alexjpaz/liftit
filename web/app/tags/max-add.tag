<max-add>
  <form onsubmit={submit}>
     <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="date" id="sample1" name='date' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Date...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield" each={l in lifts}>
      <input class="mdl-textfield__input" type="number" id="sample1" name={l} onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">{ lift }</label>
    </div>

    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      Store Max
    </button>
  </form>
  <pre>{ JSON.stringify(this.vm) }</pre>

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

    var store = self.api.store;

    this.lifts = ['press','deadlift','bench','squat'];

    var route = riot.route.create();

    route('/maxes/*', function(key) {
      var event = store.events[key];

      if(!event) {
        event = {
          key: store.guid(),
          date: opts.api.DateUtils.create(),
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
