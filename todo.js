// both
Todo = new Meteor.Collection('todos');

// server
if (Meteor.isServer) {
  AngularStack.module = 'todoapp';
}

// client
if (Meteor.isClient) {
  // the angular module of this app
  var app = angular.module('todoapp', ['meteor']);
  
  // controller for a list of todo's
  app.controller('TodoListCtrl', ['$scope',
                         function ($scope) {
	// a description for a potential todo
	$scope.description = "";
	
    // Make sure to keep the list of todo's uptodate
	$scope.autorun('todos', function () { 
	  return Todo.find().fetch(); 
	});
	
	// remove a todo from the list
	// called with an existing id
	$scope.remove = function (id) {
	  Todo.remove({_id: id});
	};
	
	// set the done bit of a todo to some value
	$scope.done = function (id, val) {
	  Todo.update({_id: id}, {$set: {done: val}});
	};
	
	// add the new todo
	$scope.add = function () {
	  Todo.insert({
	    description: $scope.description, 
		done: false
      });
	  $scope.description = "";
	};
	
	return {
	  todos: function () {
	    return Todo.find().fetch(); 
      }
	};
  }]);
}