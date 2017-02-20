'use strict';

(() => {
  angular.module('app', ['ngRoute','rzModule'])
  .config(['$routeProvider', '$locationProvider',($routeProvider, $locationProvider) => {
    $routeProvider
    .when('/app', {
      template: '<app></app>'
    })
    .otherwise({
      redirectTo: '/app'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
