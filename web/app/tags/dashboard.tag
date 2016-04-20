require('./dashboard/calendar.tag');
require('./dashboard/today.tag');
require('./dashboard/events.tag');
require('./dashboard/graph.tag');

<dashboard>
  <dashboard-calendar></dashboard-calendar>
  <dashboard-today></dashboard-today>
  <dashboard-graph></dashboard-graph>

  <script>
    var self = this
    var route = riot.route.create();

    route('/', function(key) {
      self.update();
    });


  </script>
</dashboard>
