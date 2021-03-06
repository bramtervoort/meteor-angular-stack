Tinytest.add("AngularStack - templating - html scanner", function (test) {
  var testInString = function(actualStr, wantedContents) {
    if (actualStr.indexOf(wantedContents) >= 0)
      test.ok();
    else
      test.fail("Expected "+JSON.stringify(wantedContents)+
                " in "+JSON.stringify(actualStr));
  };

  var checkError = function(f, msgText, lineNum) {
    try {
      f();
    } catch (e) {
      if (e.line === lineNum)
        test.ok();
      else
        test.fail("Error should have been on line " + lineNum + ", not " +
                  e.line);
      testInString(e.message, msgText);
      return;
    }
    test.fail("Parse error didn't throw exception");
  };

  var templatetify = function (name, body) {
    return '<script type="text/ng-template" id="' + name + '">'
	  + body + '</script>';
  };
  var TEMPLATE_PREAMBLE = "Template.__define__(";
  var TEMPLATE_POSTAMBLE = ");\n";

  var checkResults = function(results, expectJs, expectHead, expectBody) {
    test.equal(results.body, expectBody || '', 'body not what it should be');
    test.equal(results.js, expectJs || '', 'js not what it should be');
    test.equal(results.head, expectHead || '', 'head not what it should be');
  };

  checkError(function() {
    return html_scanner.scan("asdf");
  }, "formatting in HTML template", 1);
  // body all on one line
  checkResults(
    html_scanner.scan("<body>Hello</body>"), '', '', "Hello" );

  // multi-line body, contents trimmed
  checkResults(
    html_scanner.scan("\n\n\n<body>\n\nHello\n\n</body>\n\n\n"),'', '', "Hello");


  // same as previous, but with various HTML comments
  checkResults(
    html_scanner.scan("\n<!--\n\nfoo\n-->\n<!-- -->\n"+
                      "<body>\n\nHello\n\n</body>\n\n<!----\n>\n\n"),'', '', "Hello");

  // head and body
  checkResults(
    html_scanner.scan("<head>\n<title>Hello</title>\n</head>\n\n<body>World</body>\n\n"), '',
    "<title>Hello</title>",
	"World");

  // head and body with tag whitespace
  checkResults(
    html_scanner.scan("<head\n>\n<title>Hello</title>\n</head  >\n\n<body>World</body\n\n>\n\n"), '',
    "<title>Hello</title>",
	"World");

  // head, body, and template
  checkResults(
    html_scanner.scan("<head>\n<title>Hello</title>\n</head>\n\n<body>World</body>\n\n"+
                      '<template name="favoritefood">\n  pizza\n</template>\n'),
      templatetify("favoritefood","pizza"),
    "<title>Hello</title>", 'World');

  // one-line template
  checkResults(
    html_scanner.scan('<template name="favoritefood">pizza</template>'),
      templatetify("favoritefood","pizza"));

  // template with other attributes
  checkResults(
    html_scanner.scan('<template foo="bar" name="favoritefood" baz="qux">'+
                      'pizza</template>'),
      templatetify("favoritefood","pizza"));

  // whitespace around '=' in attributes and at end of tag
  checkResults(
    html_scanner.scan('<template foo = "bar" name  ="favoritefood" baz= "qux"  >'+
                      'pizza</template\n\n>'),
      templatetify("favoritefood","pizza"));

  // whitespace around template name
  checkResults(
    html_scanner.scan('<template name=" favoritefood  ">pizza</template>'),
      templatetify("favoritefood","pizza"));

  // single quotes around template name
  checkResults(
    html_scanner.scan('<template name=\'the "cool" template\'>'+
                      'pizza</template>'),
      templatetify('the \\"cool\\" template',"pizza"));

  // error cases; exact line numbers are not critical, these just reflect
  // the current implementation

  // unclosed body (error mentions body)
  checkError(function() {
    return html_scanner.scan("\n\n<body>\n  Hello\n</body");
  }, "body", 3);

  // bad open tag
  checkError(function() {
    return html_scanner.scan("\n\n\n<bodyd>\n  Hello\n</body>");
  }, "formatting in HTML template", 4);
  checkError(function() {
    return html_scanner.scan("\n\n\n\n<body foo=>\n  Hello\n</body>");
  }, "error in tag", 5);

  // unclosed tag
  checkError(function() {
    return html_scanner.scan("\n<body>Hello");
  }, "nclosed", 2);

  // unnamed template
  checkError(function() {
    return html_scanner.scan(
      "\n\n<template>Hi</template>\n\n<template>Hi</template>");
  }, "name", 3);

  // helpful doctype message
  checkError(function() {
    return html_scanner.scan(
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" '+
        '"http://www.w3.org/TR/html4/strict.dtd">'+
        '\n\n<head>\n</head>');
  }, "DOCTYPE", 1);

  // lowercase basic doctype
  checkError(function() {
    return html_scanner.scan(
      '<!doctype html>');
  }, "DOCTYPE", 1);

  // attributes on body not supported
  checkError(function() {
    return html_scanner.scan('<body foo="bar">\n  Hello\n</body>');
  }, "<body>", 3);

  // attributes on head not supported
  checkError(function() {
    return html_scanner.scan('<head foo="bar">\n  Hello\n</head>');
  }, "<head>", 3);

  // can't mismatch quotes
  checkError(function() {
    return html_scanner.scan('<template name="foo\'>'+
                             'pizza</template>');
  }, "error in tag", 1);

});
