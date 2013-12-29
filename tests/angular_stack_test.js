Tinytest.add('AngularStack - angular added to client', function (test) {
  test.isNotNull(angular, 'angular should be present');
});

Tinytest.add('AngularStack - angular directive added to html', function (test) {
  test.equal(1, $('html[ng-app]').length, 'angular ng-app should be in html');
});

