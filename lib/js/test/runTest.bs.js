// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Path = require("path");
var Curry = require("bs-platform/lib/js/curry.js");
var $$Promise = require("reason-promise/lib/js/src/js/promise.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var VscodeTest = require("vscode-test");

var match = $$Promise.pending(undefined);

var resolve = match[1];

var dirname = typeof __dirname === "undefined" ? undefined : __dirname;

if (dirname !== undefined) {
  var extensionDevelopmentPath = Path.resolve(dirname, "../");
  var extensionTestsPath = Path.resolve(dirname, "./suite/index");
  $$Promise.get(VscodeTest.runTests({
            extensionDevelopmentPath: extensionDevelopmentPath,
            extensionTestsPath: extensionTestsPath
          }), resolve);
} else {
  console.log("Failed to read __dirname");
  Curry._1(resolve, 1);
}

var promise = match[0];

var dirname$1 = dirname === undefined ? undefined : Caml_option.some(dirname);

exports.promise = promise;
exports.resolve = resolve;
exports.dirname = dirname$1;
/* match Not a pure module */