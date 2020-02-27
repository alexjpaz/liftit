var Cycle = require('../../models/Cycle');
var DateUtils = require('../../date');

<nav-max>
  <a href='#/maxes/{ currentMax.key }' class='navbar-link'>
    <span each={ l in lifts }>
        <span class='label {getFractionLabelColor(maxFractionFromPrevious(l))}'>{currentMax[l]}</span>
    </span>
  <a>
  <script>
    var self = this;
    this.mixin('api');

    this.lifts = ['press','deadlift','bench','squat'];

    var route = riot.route.create();

    self.today = DateUtils.create().slice(0,10);

    this.maxFractionFromPrevious = function(lift) {
      if(self.cyclePrevious && self.currentMax) {
        var fraction = Math.floor(100 - (+self.cyclePrevious[lift] / +self.currentMax[lift])*100) || 0;

        return fraction;
      }
    };

    this.getFractionLabelColor = function(fraction) {
console.log(fraction);
        if(fraction < 0) {
            return "label-danger";
        }

        if(fraction === 0) {
            return "label-info";
        }

        return "label-default";
    };

    function getThings() {
      self.currentMax = Cycle.findBefore(DateUtils.create())[0];

      if(self.currentMax) {
          var cycle = new Cycle(self.currentMax);

          self.cyclePrevious = cycle.findPrevious();
      }

      self.update();
    }

    getThings();

  </script>
</nav-max>
