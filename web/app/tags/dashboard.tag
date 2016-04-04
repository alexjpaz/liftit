<dashboard>

<div class="mdl-card mdl-shadow--4dp">
  <div class="mdl-card__supporting-text">
    Auckland Sky Tower, taken March 24th, 2014
  </div>
  <div class="mdl-card__supporting-text">
  The Sky Tower is an observation and telecommunications tower located in Auckland,
  New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
  in the Southern Hemisphere.
  </div>
</div>
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
