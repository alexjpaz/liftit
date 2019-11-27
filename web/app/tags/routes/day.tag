var Cycle = require('../../models/Cycle');
var Event = require('../../models/Event');
var DateUtils = require('../../date');
<day>
    <p if={ events.length === 0 }>No events to show for this day.</p>
    <div class='list-container'>
      <div onclick={navigateToEvent(e)} each={ e in events } class='list'>
        <div if={ e.type ==='log'}>
          <div class='pull-right'>
            <span if={ e.isGenerated } class='label label-warning'>generated</span>
          </div>
          <a class='list-avatar list-avatar--{ e.type }' href='#/logs/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.lift } { e.weight }x{ e.reps }</span>
        </div>
        <div if={ e.type ==='max'}>
          <a class='list-avatar list-avatar--{ e.type }' href='#/maxes/{ e. key }'>{ e.type[0].toUpperCase() }</a>
          <span>{ e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }</span>
        </div>
      </div>
      </div>
    </div>
  </div>

  <div class='clearfix'>
    <div class='button-group'>
      <a href='#/logs/new?date={day}' class='button-group--left' >Add Log</a>
      <a href='#/maxes/new?date={day}' class='button-group--right'>Add Cycle</a>
    </div>
  <div>

  <hr />
  <a href='#/maxes/{ currentCycle.key }' class='btn btn-default btn-block'>
    <span>
      {currentCycle.press}-{currentCycle.deadlift}-{currentCycle.bench}-{currentCycle.squat}
      <span>
  </a>

  <style>
    .list-container {
      margin-bottom: 20px;
    }
    .list {
      border: 1px solid #ddd;
      margin-top: -1px;
      padding: 12px 8px;
      overflow: hidden;
    }

    .list span {
      margin-left: 16px;
      line-height: 24px;
    }

    .list-avatar {
      float: left;
      height: 24px;
      width: 24px;
      background: #FF4242;
      border-radius: 50%;
      color: white;
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      font-weight: bold;
    }

    .list-avatar--max { background: #cc0000 ; }
    .list-avatar--log { background: #2a9fd6; }

    .button-group {
    }
    .button-group a {
      float: left;
      width: 50%;
      text-align: center;
      border: 1px solid #ddd;
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
    var route = riot.route.create();
    route('/day', function(day) {
        riot.route("/day/"+DateUtils.create().slice(0,10), null, true);
    });
    route('/day/([0-9]{4}\-([0-9]{2}\-[0-9]{2}))(.*)?', function(day) {
      self.day = day;
      self.events = Event.findOn(new Date(day));
      self.currentCycle = Cycle.findBefore(DateUtils.create(day))[0];

      self.update();
    });

    self.navigateToEvent = function(event) {
      return function(input_event) {
        var url = "";

        if(event.type === 'log') {
          url = '/logs/'+event.key
        }

        if(event.type === 'max') {
          url = '/maxes/'+event.key
        }

        riot.route(url);
      }
    };
  </script>
</day>
