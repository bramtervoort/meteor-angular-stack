meteor-angular-stack
====================
develop: [![Build Status](https://travis-ci.org/bramtervoort/meteor-angular-stack.png?branch=develop)](https://travis-ci.org/bramtervoort/meteor-angular-stack)
master: [![Build Status](https://travis-ci.org/bramtervoort/meteor-angular-stack.png?branch=master)](https://travis-ci.org/bramtervoort/meteor-angular-stack)
[![Total views](https://sourcegraph.com/api/repos/github.com/bramtervoort/meteor-angular-stack/counters/views.png)](https://sourcegraph.com/github.com/bramtervoort/meteor-angular-stack)

A meteor package that enables you to use Angular together with Meteor.
- demo at: http://bramtervoort-todo.meteor.com
- demo source at: https://github.com/bramtervoort/meteor-angular-stack/tree/example

Just install it using atmosphere.
```
mrt add angular-stack
```
Code your application like this:
```
Todos = new Meteor.Collection('todos');

// initialize your module skip this if you don't want to make a module
if(Meteor.isServer) {
  AngularStack.module = 'myapp';
}

if(Meteor.isClient) {
  // your module must use meteor (a module in the package)
  angular.module('myapp', ['meteor'])
  
  .controller('ToDoListCtrl', ['$scope', function($scope){
    
    // it will set the function result on the scope using the name you provide
    $scope.autorun('todos', function () {
      return Todo.find().fetch();
    });
  }]);
}
```
To use the angular template engin instead of the handlebars engin that comes with meteor just give your file the .ahtm extention. The library will properly prosses it. You can use in in combination with the default html templates to do handlebars.

The globals Meteor, Deps, Session, EJSON and Match are available as injetable services in small cassing. 

To disable adding the ng-app directive use:
```
if(Meteor.isServer) {
  AngularStack.module = false;
}
```

