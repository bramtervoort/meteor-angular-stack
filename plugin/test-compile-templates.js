
Tinytest.add("AngularStack - templating - ahtm compiler", function (test) {
  var mock_content = function (content, expects) {
    return {
      section: [],
	  expects: expects,
      arch: {match: function () {return true; }},
	  read: function () {
	    return content;
	  },
	  error: function (error) {
	    test.fail(error.message);
	    console.log('error called', error);
	  },
	  appendDocument: function (section) {
	    var f = this.expects.shift();
		f(section);
	  }
    };
  };
  var param = mock_content('<head> \n' + 
	'\t<title>wow</title> \n' +
	'</head> \n\n' +
	'<body> \n' +
	'\t<h1>hello world</h1> \n' +
	'</body>' +
	'<template name="test"> \n' +
	'\t<h2>hello world</h2> \n' +
	'</template>', [
	    function (section) {
		  test.equal(section.section, 'head', 'wrong section');
		  test.equal(section.data, '<title>wow</title>', 'wrong section');
		},
	    function (section) {
		  test.equal(section.section, 'body', 'wrong section');
		  test.equal(section.data, '<h1>hello world</h1>', 'wrong content');
		},
	    function (section) {
		  test.equal(section.section, 'head', 'wrong section');
		  test.equal(section.data, 
		   '<script type="text/ng-template" name="test"><h2>hello world</h2></script>'
		  , 'wrong content');
		}
	  ]);
	  
  Plugin.handle(param);
  test.equal(0, param.expects.length, 'not all expected sections present');
  
});