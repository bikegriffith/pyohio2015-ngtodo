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
      TodoResource.query().$promise.then(function(todos) {
        self.byStatus = _.groupBy(todos, 'status');
        console.log('Loaded todos by status', self.byStatus);
      });
    };

    self.init();

    self.assign = function(task) {
      task.status = 'Assigned';
      TodoResource.update({id: task.id}, task).$promise.then(function(todo) {
        console.log('updated', todo);
        self.init();
      });
    };

    self.complete = function(task) {
      task.status = 'Done';
      TodoResource.update({id: task.id}, task).$promise.then(function(todo) {
        console.log('updated', todo);
        self.init();
      });
    };

    self.show = function(task) {
      self.task = task;
    };
  });

})();
