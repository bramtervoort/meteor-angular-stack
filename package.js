Package.describe({
  summary: "Angular js library."
});

Package.on_use(function (api) {
  
  api.add_files(['server.js', 'plugin/html_scanner.js'], 'server');
  api.add_files('angular.js', 'client');
  api.export(['AngularStack'], 'server');
});

//I am sure going to test this package.
Package.on_test(function (api) {
  //api.add_files('testObjects.js', 'server');

  api.use(['angular-stack', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files('tests/angular_test.js', 'client');
  
  api.add_files([
    'tests/server_test.js'
  ], 'server');
  
  api.add_files([
    'plugin/html_scanner.js',
    'plugin/scanner_tests.js'
  ], 'server');
  
  api.add_files([
    'tests/test_double.js',
	'plugin/compile-templates.js',
	'plugin/test-compile-templates.js'
  ], 'server');
});