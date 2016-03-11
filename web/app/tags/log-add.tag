<log-add>
  <form onsubmit={submit}>
     <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="date" id="sample1" name='date' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Date...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="sample1" name='lift' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Text...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="sample1" name='weight' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Text...</label>
    </div>

    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="sample1" name='reps' onchange={ model }>
      <label class="mdl-textfield__label" for="sample1">Text...</label>
    </div>

    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      Add Log
    </button>
  </form>

  <script>
    var self = this;
    var store = opts.api.store;

    var vm = this.vm = {
      key: store.guid(),
      type: 'log'
    };

console.log(riot.route.query())

    this.model = function(e) {
      self.vm[e.target.name] = e.target.value;
    };

    this.submit = function(form) {
      form.preventDefault();
      store.trigger('addEvent', Object.assign({}, vm));
    };
  </script>
</log-add>
