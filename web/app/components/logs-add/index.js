var app = require('../../app');

var templateUrl = require('ngtemplate!html!./index.html');

var store = require('../../store');

app.directive('logsAdd', function() {
  return {
    controllerAs: 'vm',
    controller: function($routeParams) {
      var vm = this;
      vm.event = store.events[$routeParams.key];
    },
    templateUrl: templateUrl
  }
});

