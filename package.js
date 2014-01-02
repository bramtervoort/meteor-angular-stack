Package.describe({
  summary: "Angular js library."
});

Package._transitional_registerBuildPlugin({
  name: "loadTemplat",
  sources: [
    'plugin/scanner.js',
    'plugin/load-templates.js'
  ]
});

Package.on_use(function (api) {
  api.use('webapp');
  api.add_files(['server.js'], 'server');
  api.add_files(['angular.js', 'client.js'], 'client');
  api.export(['AngularStack'], 'server');
});

//I am sure going to test this package.
Package.on_test(function (api) {
  api.add_files(['server.js'], 'server');
  api.add_files(['angular.js', 'client.js'], 'client');
  
  api.use(['tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files(['tests/angular_test.js', 'tests/client_test.js'], 'client');
  api.add_files('tests/server_test.js', 'server');
  
  api.add_files([
    'plugin/scanner.js',
    'plugin/scanner_tests.js'
  ], 'server');
  
  api.add_files([
    'tests/test_double.js',
	'plugin/load-templates.js',
	'plugin/test-compile-templates.js'
  ], 'server'); 
});