require('./dashboard/calendar.tag');
require('./dashboard/today.tag');
require('./dashboard/events.tag');

<dashboard>

  <dashboard-today></dashboard-today>
  <dashboard-calendar></dashboard-calendar>
  <dashboard-events></dashboard-events>


  
  <script>
    var self = this;
    this.mixin('api');

    var route = riot.route.create();

    function getThings() {
      self.thing = self.api.store.dashboard;
      self.update();
      console.log( self.api.store )
    }

     route('/', getThings);
  </script>
</dashboard>
