if (Meteor.isServer) {
  WebApp.addHtmlAttributeHook(function (request) {
    return 'ng-app="todoapp"';
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
}