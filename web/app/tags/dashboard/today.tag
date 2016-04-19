<dashboard-today>
    <p>
      <a href='#/logs/new'>Add New Log</a>
    </p>
    <p>
      <a href='#/maxes/{ thing.currentMax.key }'>
      <span>
        {thing.currentMax.press}-{thing.currentMax.deadlift}-{thing.currentMax.bench}-{thing.currentMax.squat}
      <span>
      </a>
    </p>
  <style>
    dashboard-today {
      display: block;
    }

    dashboard-today .card {
      border: 1px solid #aaa;
      border-radius: 4px;
      padding: 4px;
      margin-bottom: 10px;
    }
  </style>
  <script>
    var self = this;
    this.mixin('api');

    var route = riot.route.create();

    function getThings() {
      self.thing = self.api.store.dashboard;
      self.update();
    }

     route('/', getThings);
  </script>
</dashboard-today>
