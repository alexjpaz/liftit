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
<div class="mdl-card__actions mdl-card--border">
  <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
    Get Started
  </a>
</div>
<div class="mdl-card__menu">
  <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i class="material-icons">share</i>
  </button>
</div>
<a href class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
  Button
  </button>
  <a href='#/logs/new'>Add Log</a>
  <script>
var self = this;

var store = self.store = opts.api.store;

self.navigate = function(key) {
  return function() {
    riot.route('/logs/'+key);
  };
};

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
