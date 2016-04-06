<dashboard-events>
  <pre>{ JSON.stringify(derp, null, 2) }</pre>
  <script>
    var self = this;
    this.mixin('store');

    self.derp = Object.keys(self.store.events).map(function(k) {
      return self.store.events[k];
    });

  </script>
</dashboard-events>
