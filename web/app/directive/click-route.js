var app = require('../app');

app.directive('clickRoute', function() {
  return {
    controllerAs: 'vm',
    controller: function($element, $location, $scope, $attrs) {
      var vm = this;
      vm.href = "";

      $attrs.$observe('clickRoute', function(href) {
        vm.href = href;
      });

      $element.bind('click', function() {
        console.log(vm.href);
        $location.path(vm.href);
        $scope.$apply();
      });
    }
  };
});
