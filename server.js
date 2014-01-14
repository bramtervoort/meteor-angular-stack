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