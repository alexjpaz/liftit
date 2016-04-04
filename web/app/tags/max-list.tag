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
      <tr each={ l in logs } onclick={navigate(l.key)}>
        <td>{ l.date }</td>
        <td>{ l.press }</td>
        <td>{ l.deadlift }</td>
        <td>{ l.bench }</td>
        <td>{ l.squat }</td>
      </tr>
    </tbody>
  </table>
  <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href='#/maxes/new'>
    Add Max
  </a>

  <pre>{ JSON.stringify(logs, null, 4); }</pre>
  <script>
    var self = this;

    this.mixin('api');

    var store = this.api.store;

    var getLogs = function() {
      self.logs = store.maxes.list();
      self.update();
    };

    self.navigate = function(key) {
      return function() {
        riot.route('/maxes/'+key);
      };
    };


    var route = riot.route.create();

    route('/maxes', getLogs);
  </script>
</max-list>
