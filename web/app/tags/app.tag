require('./log-list.tag');
require('./log-add.tag');
require('./max-add.tag');
require('./max-list.tag');
require('./sheets.tag');
require('./dashboard.tag');
require('./nav-links.tag');

<app>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">{ title }</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav-links class='mdl-navigation mdl-layout--large-screen-only'></nav-links>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="#/logs">Logs</a>
        <a class="mdl-navigation__link" href="#/maxes">Maxes</a>
        <a class="mdl-navigation__link" href="#/sheets/531">Sheets</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
              <view></view>
                 </div>
        </div>
      </div>
    </main>
    <pre>{ JSON.stringify(opts.api.store, null, 2) }</pre>
  </div>
  <script>
    var self = this;

    var el = null;
    var tag = null;

    var updateView = function(viewName, title, toTag) {
      return function() {
        opts.views.main = viewName;
        self.title = title;

        if(tag) {
          tag.unmount(true);
        }

        self.update();
       var tagNode = document.createElement(viewName);

         el.appendChild(tagNode);
        console.log(el, opts)
        tag = riot.mount(tagNode, opts)[0];
      };
    };

    var route = function(url, tagName, title) {
      riot.route(url, updateView(tagName, title));
    };

    this.title = "Main";

    this.on('mount', function() {
      el = this.root.querySelector('view');
    })

    opts.api.routeParams = {a:1};

    riot.route(function() {
      opts.api.routeParams = arguments;
    });

    route('/logs', 'log-list', 'Logs');

    route('/logs/*', 'log-add', 'Log Edit');

    route('/maxes', 'max-list', 'Maxes');

    route('/maxes/*', 'max-add', 'Max Add');

    route('/sheets/*', 'sheets', 'Sheets');

    route('/', 'dashboard', 'Dashboard');

    riot.route.start(true);
  </script>

</app>

