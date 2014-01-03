"use strict";
angular.module('meteor', [])

.run(['$rootScope', 'deps', function ($rootScope, deps) {
	// function to autorun some reactive functions
	$rootScope.autorun = function (field, fn) {
		var $scope = this,
		    computation = deps.autorun((function ($scope, field, fn) {
				return function (comp) {
					$scope[field] = fn();
					
					if(!comp.firstRun)
						$scope.$apply();
				}
			})($scope, field, fn));
			
		// if I don't save the computation it will 
		// get lost if I run this function again. 	  
		$scope.$on('$destroy', (function (comp) {
			return function () {
				comp.stop();
			}
		})(computation));
	};
}])

.factory('meteor', [
  function() { return Meteor; }
])

.factory('deps', [
  function() { return Deps; }
])

.factory('session', [
  function() { return Session; }
])

.factory('match', [
  function() { return Match; }
])

.factory('ejson', [
  function() { return EJSON; }
]);