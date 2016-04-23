var Event = require('../../models/Event');
<day>
  <div class='panel panel-default'>
    <div class='panel-heading'>
      Events for { day }
    </div>
    <div class='panel-body'>

    <p if={ events.length === 0 }>No events to show for this day.</p>
    <div onclick={navigateToEvent(e)} each={ e in events } class='list'>
      <div if={ e.type ==='log'}>
        <h5><a href='#/logs/{ e. key }'>{ e.type }</a></h5>
        <p>{ e.lift } { e.weight }x{ e.reps }</p>
      </div>
      <div if={ e.type ==='max'}>
        <h5><a href='#/maxes/{ e. key }'>{ e.type }</a></h5>
        <p>{ e.press }-{ e.deadlift }-{ e.bench }-{ e.squat }</p>
      </div>
    </div>
    </div>
  </div>
  <div class='button-group'>
    <a href='#/logs/new?date={day}' class='button-group--left' >Add Log</a>
    <a href='#/maxes/new?date={day}' class='button-group--right'>Add Cycle</a>
  </div>

  <style>
    .list {
      border: 1px solid #ddd;
      margin-top: -1px;
      padding: 4px 8px;
    }
    .button-group {
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
    var route = riot.route.create();
    route('/day/([0-9]{4}\-([0-9]{2}\-[0-9]{2}))(.*)?', function(day) {
      self.day = day;
      self.events = Event.findOn(day);
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
