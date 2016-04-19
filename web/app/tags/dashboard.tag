require('./dashboard/calendar.tag');
require('./dashboard/today.tag');
require('./dashboard/events.tag');

<dashboard>
  <dashboard-today></dashboard-today>
  <dashboard-calendar></dashboard-calendar>
  <script>
    var self = this
    var route = riot.route.create();

    route('/', function(key) {
      self.update();
    });


  </script>
</dashboard>
