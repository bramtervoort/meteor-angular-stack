
AngularStack = {
  module: null,
  attribHook: function (request) {
    if (AngularStack.module === null) 
	  return 'ng-app';
	  
    if (AngularStack.module === false) 
	  return '';
	
	return 'ng-app="' + AngularStack.module + '"';
  }
};

WebApp.addHtmlAttributeHook(AngularStack.attribHook);

var uglyfy = UglifyJSMinify;
UglifyJSMinify = function (text, options) {
  var ngmin = Npm.require('ngmin');
  return uglyfy(ngmin.annotate(text), options);
};