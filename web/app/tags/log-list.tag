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
      <tr each={ l in logs }>
        <td>{ l.date }</td>
        <td>{ l.lift }</td>
        <td>{ l.weight }</td>
        <td>{ l.reps }</td>
      </tr>
    </tbody>
  </table>
  <a href='#/logs/new'>Add Log</a>

  <pre>{ JSON.stringify(logs, null, 4); }</pre>
  <script>
    var self = this;

    var store = self.store = opts.api.store;

    self.logs = Object.keys(store.events).map(function(k){
      return store.events[k];
    }).filter(function(event) {
      return event.type === 'log';
    });

    store.on('digest', function(log) {
      self.update();
    });
  </script>
</log-list>
