<log-list>

<table class="table table-bordered">
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
      <td><a href='/logs/{ l.key }'>{ l.date }</a></td>
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

  this.mixin('api');

  var store = self.store = this.api.store;

  self.navigate = function(key) {
    return function() {
      riot.route('/logs/'+key);
    };
  };

  var getLogs = function() {
    self.logs = store.logs.list();
    self.update();
  };

  var route = riot.route.create();

  route('/logs', getLogs);

  </script>
</log-list>
