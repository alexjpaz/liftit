var liftit = require('liftit-common');

var Log = require('../../models/Log');
var DateUtils = require('../../date');

<dashboard-today-table>
  <style scoped>
    .flash { animation-duration: 2s; }
    .flash--press { animation-name: flash_red; }
    .flash--deadlift { animation-name: flash_green; }
    .flash--bench { animation-name: flash_blue; }
    .flash--squat { animation-name: flash_orange; }

    :scope a.flash {
        border-radius: 100%;
    }

    @keyframes flash_red {
        from {
            border-color: red;
            background-color: red;
        }
    }

    @keyframes flash_green {
        from {
            border-color: green;
            background-color: green;
        }
    }

    @keyframes flash_blue {
        from {
            border-color: blue;
            background-color: blue;
        }
    }

    @keyframes flash_orange {
        from {
            border-color: orange;
            background-color: orange;
        }
    }
  </style>
  <a href='#/tools/table?weight={weight}&lift={lift}&week={week}' class='btn btn-link flash flash--{lift}'>
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
