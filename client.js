var meteor = angular.module('meteor', []);

meteor.factory('meteor', [
  function() { return Meteor; }
]);

meteor.factory('deps', [
  function() { return Deps; }
]);