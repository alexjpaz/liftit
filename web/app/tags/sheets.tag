<sheets>
<pre>{ JSON.stringify(max, null, 2); }</pre>
<script>
    var self = this;

    var store = self.store = opts.api.store;

    self.max = Object.keys(store.events).map(function(k){
      return store.events[k];
    }).filter(function(event) {
      return event.type === 'max';
    }).filter(function(event) {
      var dd = new Date(event.date);
      dd.setMonth(dd.getMonth() + 1);
      return dd <= new Date();
    }).sort(function(a,b) {
      return a.date > b.date;
    })
    .reverse()
    [0];
</script>
</sheets>
