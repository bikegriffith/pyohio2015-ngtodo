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

  // Main controller
  todoApp.controller('TodoListCtrl', function(TodoResource) {
    var self = this;

    self.init = function() {
      TodoResource.query(function(todos) {
        self.byStatus = _.groupBy(todos, 'status');
      });
    };

    self.changeStatus = function(task, status) {
      task.status = status;
      TodoResource.update({id: task.id}, task, function(todo) {
        self.init();
      });
    };

    self.show = function(task) {
      self.task = task;
    };

    self.init();
  });

})();
