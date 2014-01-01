Tinytest.add('AngularStack - Angular Module - meteor module should exist', function (test) {
  test.isNotNull(angular.module('meteor'));
});

Tinytest.add('AngularStack - Angular Module - meteor.meteor service should return Meteor', function (test) {
  test.equal(Meteor, angular.injector(['meteor', 'ng']).get('meteor'));
});

Tinytest.add('AngularStack - Angular Module - meteor.deps service should return deps', function (test) {
  test.equal(Deps, angular.injector(['meteor', 'ng']).get('deps'));
});

Tinytest.add('AngularStack - Angular Module - meteor.session service should return Session', function (test) {
  test.equal(Session, angular.injector(['meteor', 'ng']).get('session'));
});

Tinytest.add('AngularStack - Angular Module - meteor.match service should return Match', function (test) {
  test.equal(Match, angular.injector(['meteor', 'ng']).get('match'));
});

Tinytest.add('AngularStack - Angular Module - meteor.ejson service should return EJSON', function (test) {
  test.equal(EJSON, angular.injector(['meteor', 'ng']).get('ejson'));
});

