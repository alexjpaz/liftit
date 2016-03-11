require('./log-list.tag');
require('./log-add.tag');

<app>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Title</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" href="#/logs">Logs</a>
          <a class="mdl-navigation__link" href="#/maxes">Maxes</a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="#/logs">Logs</a>
        <a class="mdl-navigation__link" href="#/maxes">Maxes</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <log-list if={opts.views.main === "log-list"} api={opts.api}></log-list>
        <log-add if={opts.views.main === "log-add"} api={opts.api}><log-add>
      </div>
    </main>
  </div>
  <script>
    var self = this;
    riot.route('/logs', function(name) {
      opts.views.main = 'log-list';
      self.update();
    });

    riot.route('/logs/*', function(key) {
      opts.views.main = 'log-add';
      self.update();
    });

    riot.route.start(true);
  </script>
  <style>
    .mdl-layout__content {
      padding: 20px;
    }
  </style>
</app>

