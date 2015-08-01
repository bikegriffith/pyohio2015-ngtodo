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

    var init = function() {
      TodoResource.query(function(todos) {
        self.todos = _.groupBy(todos, 'status');
      });
    };
    init();

    self.changeStatus = function(todo, status) {
      todo.status = status;
      TodoResource.update({id: todo.id}, todo, function(todo) {
        init();
      });
    };

    self.show = function(todo) {
      self.todo = todo;
    };
  });

  // <todo-list ... /> componenet
  todoApp.directive('todoList', function() {
    return {
      scope: {
          todos: '=todos',
          nextStatus: '=nextStatus',
          nextStatusLabel: '=nextStatusLabel',
          btnColor: '=btnColor',
          onSelect: '=onSelect',
          onChangeStatus: '=onChangeStatus'
      },
      templateUrl: '/static/partials/todo-list.html'
    };
  });

})();
