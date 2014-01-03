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

Tinytest.add('AngularStack - Angular Module - $scope.autorun reruns and stops properly', function (test) {
	var injector = angular.injector(['meteor', 'ng']),
		rootScope = injector.get('$rootScope'),
		deps = injector.get('deps'),
		session = injector.get('session'),
		
		execA = 0,
		execB = 0,
		
		scopeA = rootScope.$new(),
		scopeB = rootScope.$new();
	session.set('sesA', 'somevalue');
	scopeA.autorun('sesA', function () {
		++execA;
		return session.get('sesA');
	});
	scopeB.autorun('sesA', function () {
		++execB;
		return session.get('sesA');
	});
	
	// first check if the value's get set properly
	test.equal(1, execA, 'should have executed the value');
	test.equal(1, execB, 'should have executed the value');
	test.equal('somevalue', scopeA.sesA, 'should have set the value');
	test.equal('somevalue', scopeB.sesA, 'should have set the value');
	
	session.set('sesA', 'someothervalue');
	deps.flush(); // force deps to update
	test.equal(2, execA, 'should have executed the value');
	test.equal(2, execB, 'should have executed the value');
	test.equal('someothervalue', scopeA.sesA, 'should have set the value');
	test.equal('someothervalue', scopeB.sesA, 'should have set the value');
	
	scopeA.$destroy();
	session.set('sesA', 'yet some other value');
	deps.flush(); // force deps to update
	test.equal(2, execA, 'should have executed the value');
	test.equal(3, execB, 'should have executed the value');
	test.equal('someothervalue', scopeA.sesA, 'should have not set the value');
	test.equal('yet some other value', scopeB.sesA, 'should have set the value');
	
	scopeB.$destroy();
	session.set('sesA', 'yet some other value extra');
	deps.flush(); // force deps to update
	test.equal(2, execA, 'should have executed the value');
	test.equal(3, execB, 'should have executed the value');
	test.equal('someothervalue', scopeA.sesA, 'should have not set the value');
	test.equal('yet some other value', scopeB.sesA, 'should have set the value');
});