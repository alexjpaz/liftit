var angular = require('angular');

require('./store');

require('./routes');

require('./directive/click-route');

require('./components/app');
require('./components/logs');
require('./components/logs-add');

require('./screens/dashboard');

angular.bootstrap(document, ['app']);
