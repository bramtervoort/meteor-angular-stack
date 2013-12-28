// both
Todo = new Meteor.Collection('todos');

// server
if (Meteor.isServer) {
  WebApp.addHtmlAttributeHook(function (request) {
    return 'ng-app="todoapp"';
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// client
if (Meteor.isClient) {
  var app = angular.module('todoapp', []);
  app.controller('TodoListCtrl', ['$scope', 
                         function ($scope) {
						 
    Deps.autorun(function (computation) {
	  $scope.todos = Todo.find().fetch();
	  
	  if (!computation.firstRun) {
	    $scope.$apply();
	  }
	});
	
	$scope.remove = function (id) {
	  Todo.remove({_id: id});
	};
	
	$scope.description = "";
	$scope.add = function () {
	  Todo.insert({
	    description: $scope.description, 
		done: false
      });
	  $scope.description = "";
	};
  }]);
}