meteor-angular-stack
====================

A meteor project that enables you to use angularjs together with meteor.

This is the first test app trying if it works as I expected. Its a short 
todo example app, everyone can add stuf and check of stuff. But it works
in sink on all devices.

 - blog: http://bram-tervoort.nl/2013/12/i-started-my-first-meteor-app/
 - app: http://bramtervoort-todo.meteor.com/

Quick steps to get angular working
----------------------------------
 1. drop angular.js file from google in a client folder.
 2. add ng-app directive to html using: 
```
if (Meteor.isServer) {
  WebApp.addHtmlAttributeHook(function (request) {
    return 'ng-app="todoapp"';
  });
}
```
 3. add template to public folder
 4. load template using ng-include
 5. use Deps.autorun to re run code in your controllers when it invalidates.
