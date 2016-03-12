var app = require('../app');

var templateUrl = require('ngtemplate!html!./app.html');

app.directive('app', function() {
  return {
    templateUrl: templateUrl
  };
});

