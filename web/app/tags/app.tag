require('./log-list.tag');
require('./log-add.tag');
require('./max-add.tag');
require('./max-list.tag');
require('./sheets.tag');
require('./dashboard.tag');
require('./nav-links.tag');
require('./route.tag');
require('./common/panel.tag')

<app>
  <div style='padding-top: 80px'>
    <div class='container'>
      <div class='col-md-2'>
        <ul class="nav nav-pills nav-stacked">
          <li><a href='#/'>Home</a></li>
          <li><a href='#/logs'>Logs</a></li>
          <li><a href='#/maxes'>Maxes</a></li>
        </ul>
      </div>
      <div class='col-md-10'>
        <route when='/'>
          <dashboard></dashoard>
        </route>
        <route when='/logs'>
          <log-list></log-list>
        </route>
        <route when='/maxes'>
          <max-list></max-list>
        </route>
        <route when='/maxes/*'>
          <max-add></max-add>
        </route>
        <route when='/logs/*'>
          <log-add></log-add>
        </route>
      </div>
    </div>
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
        tag = riot.mount(tagNode, opts)[0];
      };
    };

    var route = function(url, tagName, title) {
      riot.route(url, updateView(tagName, title));
      var subRoute = riot.route.create()
      subRoute(url, function() {
        opts.api.routeParams = arguments;
      });
    };

    this.title = "Main";

    this.on('mount', function() {
      el = this.root.querySelector('view');
    })

    opts.api.routeParams = [];



    // route('/logs', 'log-list', 'Logs');

//    route('/logs/*', 'log-add', 'Log Edit');
//
//    route('/maxes', 'max-list', 'Maxes');
//
//    route('/maxes/*', 'max-add', 'Max Add');
//
//    route('/sheets/*', 'sheets', 'Sheets');
//
//    route('/', 'dashboard', 'Dashboard');

    riot.route.start(true);
  </script>


</app>

