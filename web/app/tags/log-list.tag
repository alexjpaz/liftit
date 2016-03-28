<log-list>

<table class="mdl-data-table mdl-js-data-table  mdl-shadow--2dp">
  <thead>
    <tr>
      <th>Date</th>
      <th>Lift</th>
      <th>Weight</th>
      <th>Reps</th>
    </tr>
  </thead>
  <tbody>
    <tr each={ l in logs } onclick={navigate(l.key)}>
      <td>{ l.date }</td>
      <td>{ l.lift }</td>
      <td>{ l.weight }</td>
      <td>{ l.reps }</td>
    </tr>
  </tbody>
</table>
  <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href='#/logs/new'>
    Add Log
  </a>
  <script>
  var self = this;

  var store = self.store = opts.api.store;

  self.navigate = function(key) {
    return function() {
      riot.route('/logs/'+key);
    };
  };

  var getLogs = function() {
    self.logs = Object.keys(store.events).map(function(k){
      return store.events[k];
    }).filter(function(event) {
      return event.type === 'log';
    });
    self.update();
  };

  var route = riot.route.create();

  route('/logs', getLogs);

  </script>
</log-list>
