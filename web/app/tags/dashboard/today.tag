var Cycle = require('../../models/Cycle');
var DateUtils = require('../../date');
<dashboard-today>
  <div class='button-group'>
    <a href='#/logs/new' class='button-group--left' >Add Log</a>
    <a href='#/maxes/{ currentMax.key }' class='button-group--right'>
    <span>
      {currentMax.press}-{currentMax.deadlift}-{currentMax.bench}-{currentMax.squat}
    <span>
    </a>
  </div>

  <style scoped>
    :scope {
      display: block;
      overflow: hidden;
    }

    :scope .card {
      border: 1px solid #aaa;
      border-radius: 4px;
      padding: 4px;
      margin-bottom: 10px;
    }

    .button-group a {
      float: left;
      width: 50%;
      text-align: center;
      border: 1px solid #aaa;
      border-radius: 4px;
      padding: 8px;
    }


    a.button-group--left  {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    a.button-group--right {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-left: 0;

    }
  </style>
  <script>
    var self = this;
    this.mixin('api');

    var route = riot.route.create();

    function getThings() {
      self.currentMax = Cycle.findBefore(DateUtils.create())[0];
console.log(self.thing);
      self.update();
    }

     route('/', getThings);
  </script>
</dashboard-today>
