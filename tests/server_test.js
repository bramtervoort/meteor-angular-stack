Tinytest.add('AngularStack - server - angular directive added to html', function (test) {
  var result = AngularStack.attribHook();
  test.equal(result, 'ng-app', 'should add ng-directive to html');
});

Tinytest.add('AngularStack - server - angular directive with module added to html', function (test) {
  AngularStack.module = 'testing';
  var result = AngularStack.attribHook();
  test.equal(result, 'ng-app="testing"', 'should add ng-directive with module to html');
});

Tinytest.add('AngularStack - server - angular directive turned off', function (test) {
  AngularStack.module = false;
  var result = AngularStack.attribHook();
  test.equal(result, '', 'should not add ng-directive to html');
});