var meteor = angular.module('meteor', []);

meteor.factory('meteor', [
  function() { return Meteor; }
]);

meteor.factory('deps', [
  function() { return Deps; }
]);

meteor.factory('session', [
  function() { return Session; }
]);

meteor.factory('match', [
  function() { return Match; }
]);

meteor.factory('ejson', [
  function() { return EJSON; }
]);