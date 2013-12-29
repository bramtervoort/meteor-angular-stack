Package.describe({
  summary: "Angular js library."
});

Package.on_use(function (api) {
  api.add_files('server.js', 'server');
  api.add_files('angular.js', 'client');
});

//I am sure going to test this package.
Package.on_test(function (api) {
  api.use(['angular-stack', 'tinytest', 'test-helpers'], ['client', 'server']);
  //api.use('tinytest');
  // api.use('htmljs');
  // api.use('templating');
  // api.use('handlebars');
  // api.use('underscore');
  // api.use(['test-helpers', 'domutils', 'session', 'deps',
           // 'spark', 'minimongo'], 'client');
  // api.use('handlebars', 'server');
  // api.add_files([
    // 'templating_tests.js',
    // 'templating_tests.html'
  // ], 'client');
  // api.add_files([
    // 'plugin/html_scanner.js',
    // 'scanner_tests.js'
  // ], 'server');
  api.add_files('angular_test.js', 'client');
  
});