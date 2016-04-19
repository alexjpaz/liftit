require('./dashboard/calendar.tag');
require('./dashboard/today.tag');
require('./dashboard/events.tag');

<dashboard>
  <dashboard-calendar></dashboard-calendar>
  <dashboard-today></dashboard-today>
  <script>
    var self = this
    var route = riot.route.create();

    route('/', function(key) {
      self.update();
    });


  </script>
</dashboard>
