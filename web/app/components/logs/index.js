var app = require('../../app');

var templateUrl = require('ngtemplate!html!./index.html');

var store = require('../../store');

app.directive('logs', function() {
  return {
    controllerAs: 'vm',
    controller: function() {
      var vm = this;
      vm.events = store.listByType('log');
    },
    templateUrl: templateUrl
  }
});

