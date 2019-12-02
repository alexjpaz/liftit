var Cycle = require('../../models/Cycle');
var DateUtils = require('../../date');

<nav-max>
  <a href='#/maxes/{ currentMax.key }' class='navbar-link'>
    {currentMax.press}-{currentMax.deadlift}-{currentMax.bench}-{currentMax.squat}
  <a>
  <script>
    var self = this;
    this.mixin('api');

    var route = riot.route.create();

    self.today = DateUtils.create().slice(0,10);

    function getThings() {
      self.currentMax = Cycle.findBefore(DateUtils.create())[0];
console.log(self.thing);
      self.update();
    }

     route('/', getThings);
 
  </script>
</nav-max>
