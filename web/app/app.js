var index = require('file?name=[name].[ext]!./index.html')

var store = require('./store');

var app = angular.module('app', [
  'ngRoute',
  'ngMaterial'
]);

app.run(function($rootScope) {
  $rootScope.config = store.config;
});


module.exports = app;
