var liftit = require('liftit-common');

var Log = require('../../models/Log');
var DateUtils = require('../../date');

<dashboard-today-table>
  <a href='#/tools/table?weight={weight}&lift={lift}&week={week}' class='btn btn-link'>
<i class='glyphicon glyphicon-list-alt'></i>
</a>
  <script>
    var self = this;

    this.lifts = ['press','deadlift','bench','squat'];

    self.today = DateUtils.create().slice(0,10);

    var route = riot.route.create();

    function generateTableLink() {
      self.week = self.week || null;
      var map = {
        "85": "3x5",
        "90": "3x3",
        "95": "531"
      };

      self.weightFractions.forEach(function(wf) {
        if(self.log.weight == wf.weight) {
          self.week = map[wf.fraction];
        }
      });
    }

    function calculateWeigthFractions() {
      self.weightFractions = [];

      for(var i=0.85;i<1;i+=0.05) {
        self.weightFractions.push({
          weight: liftit.roundTo(self.effectiveMax[self.lift] * i, 5),
          fraction: Math.floor(i * 100),
        });
      }
    };

    route('/', function() {
      var log = Log.findBefore(DateUtils.create())[0];

      log = new Log(log); // TODO

      self.log = log;

      self.effectiveMax = log.getEffectiveMax();

      self.weight = self.effectiveMax[log.lift];
      self.lift = log.lift;

      calculateWeigthFractions();
      generateTableLink();

      self.update();
    });
  </script>
</dashboard-today-table>
