Tinytest.add('AngularStack - Angular Module - meteor module should exist', function (test) {
  test.isNotNull(angular.module('meteor'));
});

Tinytest.add('AngularStack - Angular Module - meteor.meteor service should return Meteor', function (test) {
  test.equal(Meteor, angular.injector(['meteor', 'ng']).get('meteor'));
});


Tinytest.add('AngularStack - Angular Module - meteor.deps service should return deps', function (test) {
  test.equal(Deps, angular.injector(['meteor', 'ng']).get('deps'));
});

