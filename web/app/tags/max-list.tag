<max-list>
  <table class="mdl-data-table mdl-js-data-table  mdl-shadow--2dp">
    <thead>
      <tr>
        <th>Date</th>
        <th>Date</th>
        <th>Date</th>
        <th>Date</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr each={ l in logs }>
        <td>{ l.date }</td>
        <td>{ l.press }</td>
        <td>{ l.deadlift }</td>
        <td>{ l.bench }</td>
        <td>{ l.squat }</td>
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
      return event.type === 'max';
    });

    store.on('digest', function(log) {
      self.update();
    });
  </script>
</max-list>
