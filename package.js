Package.describe({
  summary: "Angular js library."
});

Package.on_use(function (api) {
  api.add_files('server.js', 'server');
  api.add_files('angular.js', 'client');
  api.export(['AngularStack'], 'server');
});

//I am sure going to test this package.
Package.on_test(function (api) {
  //api.add_files('testObjects.js', 'server');

  api.use(['angular-stack', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files('tests/angular_test.js', 'client');
  api.add_files('tests/server_test.js', 'server');
  
});