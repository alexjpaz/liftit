require('./calendar.tag');
require('./dashboard/events.tag');

<dashboard>

  <calendar></calendar>
  <dashboard-events></dashboard-events>


  <p>
    <a href='#/maxes/{ thing.currentMax.key }'>
    <span class='label label-default'>
      {thing.currentMax.press}-{thing.currentMax.deadlift}-{thing.currentMax.bench}-{thing.currentMax.squat}
    <span>
    </a>
  </p>

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
