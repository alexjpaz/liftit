<log-list>
  <pre>{ JSON.stringify(store, null, 4); }</pre>
  <script>
    var self = this;

    var store = self.store = opts.api.store;

    self.logs = store.logs;

    store.on('digest', function(log) {
      self.update();
    });
  </script>
</log-list>
