var app = require('./app');

app.config(function($routeProvider) {
  $routeProvider.when('/logs', {
    template: "<logs></logs>"
  });

  $routeProvider.when('/logs/:key', {
    template: "<logs-add></logs-add>"
  });

  $routeProvider.when('/dashboard', {
    template: "<dashboard></dashboard>"
  });

  $routeProvider.otherwise({
    redirectTo: '/dashboard'
  });

});

