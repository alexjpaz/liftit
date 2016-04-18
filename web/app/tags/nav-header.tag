<nav-header>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
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
         </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#/profile">P</a></li>
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
    </script>
</nav-header>
