<route>
  <div if={show} >
    <yield />
  </div>
  <script>
    var self = this;
    self.show = false;
    var subRoute = riot.route.create()
    subRoute(function() {
      self.show = false;
      self.update();
    });
    subRoute(opts.when, function() {
      self.show = true;
      self.update();
    });
  </script>
</route>
