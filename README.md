meteor-angular-stack
====================
develop: [![Build Status](https://travis-ci.org/bramtervoort/meteor-angular-stack.png?branch=develop)](https://travis-ci.org/bramtervoort/meteor-angular-stack)
master: [![Build Status](https://travis-ci.org/bramtervoort/meteor-angular-stack.png?branch=master)](https://travis-ci.org/bramtervoort/meteor-angular-stack)

A meteor package that enables you to use Angular together with Meteor.

Its not yet finished so its not yet in atmosphere you can however try it.
Just download the package to the packages folder and install it using atmosphere.
```
mrt add angular-stack
```

It will add the ng-app directive to your html you can give this your own namespace using:
```
if(Meteor.isServer) {
  AngularStack.module = 'myapp';
}
```
To disable adding the ng-app directive use:
```
if(Meteor.isServer) {
  AngularStack.module = false;
}
```

To use the angular template engin instead of the handlebars engin that comes with meteor just give your file the .ahtm extention. The library will properly prosses in. You can use in in combination with the default html templates to do handlebars.

To gain acces to meteor services in angular style add meteor as a dependency to your module. meteor, deps, session and other services can be injected into your controllers as requested. (happy to add more if you miss them please let me know.) 

To make your controller handle reactive data sources (query's, loged in users, ect) wrap them in a deps.autorun:
```
var app = angular.module('myapp', ['meteor'];

apps.controller('LoggedInCtrl', ['deps', '$scope', 'meteor', function(deps, $scope, meteor) {
  deps.autorun(function (comp) {
    $scope.user = meteor.user();
    
    if(!comp.firstRun)
      $scope.$apply();
  });
}]);
```
