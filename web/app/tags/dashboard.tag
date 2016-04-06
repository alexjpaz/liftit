require('./calendar.tag');
require('./dashboard/events.tag');

<dashboard>

  <calendar></calendar>
  <dashboard-events></dashboard-events>


  <pre>{ JSON.stringify(thing, null, 4) }</pre>

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
