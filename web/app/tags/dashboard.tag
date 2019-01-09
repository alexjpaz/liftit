require('./dashboard/calendar.tag');
require('./dashboard/today.tag');
require('./dashboard/events.tag');
require('./dashboard/graph.tag');
require('./dashboard/timeline.tag');

<dashboard>
  <dashboard-calendar></dashboard-calendar>
  <dashboard-today></dashboard-today>
  <dashboard-graph></dashboard-graph>
  <br />
  <dashboard-timeline></dashboard-timeline>

  <script>
    var self = this
    var route = riot.route.create();

    route('/', function(key) {
      self.update();
    });


  </script>
</dashboard>
