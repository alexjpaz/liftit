<nav-links>
  <nav>
<a class="mdl-navigation__link" href={l.href} each={ l in links }>{ l.title }</a>
  </nav>
  <script>
  this.links = [{
    title: "Dashboard",
    href: '#/'
  },{
    title: "Maxes",
    href: '#/maxes'
  },{
    title: "Logs",
    href: '#/logs'
  }];
  </script>
</nav-links>
