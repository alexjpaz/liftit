require('./layout/nav-max.tag');

<nav-header>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <p class="navbar-text navbar-right pull-right">
          <a href="#/day" class="navbar-link">
            <i class='glyphicon glyphicon-pencil'></i>
          </a>
        </p>
        <p class="navbar-text navbar-right pull-right">
          <nav-max></nav-max>
        </p>
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" onclick={toggleMenu}>
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Liftit</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#/logs">Logs</a></li>
            <li><a href="#/maxes">Cycles</a></li>
            <li><a href="#/profile">Profile</a></li>
            <li><a href="#/tools/table">Table</a></li>
            <li><a href='https://liftit-1138.firebaseapp.com/'>Go to liftit v2 (beta)</li>
         </ul>
        </div><!--/.nav-collapse -->

      </div>
    </nav>
    <script>
      var self = this;
      this.menuIn = false;
      this.toggleMenu = function(e) {
        self.menuIn = !self.menuIn;
        if(self.menuIn) {
          self.navbar.classList.add('in');
        } else {
          self.navbar.classList.remove('in');
        }
      };

      var anchors = this.navbar.querySelectorAll('a');
      [].forEach.call(anchors, function(e) {
        e.addEventListener('click', function() {
              self.navbar.classList.remove('in');
              self.menuIn = false;
            }, false);
      })

      document.addEventListener('click', function() {
        self.navbar.classList.remove('in');
        self.menuIn = false;

      }, true);
    </script>
</nav-header>
