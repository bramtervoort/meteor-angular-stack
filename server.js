AngularStack = {
  module: null,
  attribHook: function (request) {
    if (AngularStack.module === null) 
        return {'ng-app': ''};
    else if (AngularStack.module === false) 
        return {};
    else
	return {'ng-app': AngularStack.module};
  }
};
WebApp.addHtmlAttributeHook(AngularStack.attribHook);
