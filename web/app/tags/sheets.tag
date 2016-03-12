<sheets>
<a href='//liftit-sheets.alexjpaz.com/531bbb/?press={max.press}&deadlift={max.deadlift}&bench={max.bench}&squat={max.squat}' target='_blank'>531bbb</a>
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
      return dd <= new Date();
    }).sort(function(a,b) {
      return a.date < b.date;
    })
    [0]

</script>
</sheets>
