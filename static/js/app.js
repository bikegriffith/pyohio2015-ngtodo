(function() {
  'use strict';

  // Module setup
  var todoApp = angular.module('todoApp', [
      'ui.bootstrap',
      'ngResource'
    ]);

  // Services
  todoApp.factory('TodoResource', function($resource) {
    return $resource('/tasks/:id', {}, {
                query: {method: 'GET', isArray: true},
                update: {method: 'PUT'}
              });
  });

})();
