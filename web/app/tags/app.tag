require('./routes/log-list.tag');
require('./routes/log-add.tag');
require('./routes/max-add.tag');
require('./routes/max-list.tag');
require('./routes/cycle/schedule.tag');
require('./sheets.tag');
require('./dashboard.tag');
require('./nav-header.tag');
require('./nav-links.tag');
require('./route.tag');
require('./routes/day.tag');
require('./routes/setup.tag');
require('./routes/profile.tag');
require('./common/panel.tag')
require('./layout/toast-bar.tag')
require('./routes/tools/table.tag')

<app>
  <style>
    .app-container {
      padding-left: 0px;
      padding-right: 0px;
      max-width: 768px;
    }

    .navbar-toggle {
      position: relative;
      float: left;
      padding: 9px 10px;
      margin-top: 8px;
      margin-left: 15px;
      margin-bottom: 8px;
      background-color: transparent;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
    }
  </style>
  <nav-header></nav-header>
  <div style='padding-top: 60px'>
    <div class='app-container container'>
      <div class='col-md-12'>
        <route when='/'>
          <dashboard></dashoard>
        </route>
        <route when='/logs'>
          <log-list></log-list>
        </route>
        <route when='/cycles/schedule..'>
          <cycle-schedule></cycle-schedule>
        </route>
        <route when='/maxes'>
          <max-list></max-list>
        </route>
        <route when='/maxes/..'>
          <max-add></max-add>
        </route>
        <route when='/logs/..'>
          <log-add></log-add>
        </route>
        <route when='/day..'>
          <day></day>
        </route>
        <route when='/tools/table..'>
          <tools-table></tools-table>
        </route>
        <route when='/profile'>
          <profile></profile>
        </route>
        <route when='/setup'>
          <setup></setup>
        </route>
      </div>
    </div>
    <toast-bar></toast-bar>
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

    if(!opts.api.store.events || Object.keys(opts.api.store.events).length === 0) {
      riot.route('/setup');
    }

    riot.route.start(true);
  </script>


</app>

