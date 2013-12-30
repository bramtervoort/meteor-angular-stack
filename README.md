meteor-angular-stack
====================

A meteor package that enables you to use Angular together with Meteor.

[![Build Status](https://travis-ci.org/bramtervoort/meteor-angular-stack.png?branch=master)](https://travis-ci.org/bramtervoort/meteor-angular-stack)

Its not yet finished so its not yet in atmosphere you can however try it.
Just download the package to the packages folder and install it using atmosphere.
```
mrt add angular-stack
```

It will add the ng-app directive to your html you can give this your own namespace using:
```
AngularStack.module = 'myapp';
```
To disable adding the ng-app directive use:
```
AngularStack.module = false;
```

You can't use angular markup in the html files that are in your project.  Becaulse they are
compiled with handlebars. To use markup place a template in your public folder and include it
with a ng-include directive. 

