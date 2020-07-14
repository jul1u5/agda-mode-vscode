// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Glob = require("glob");
var Path = require("path");
var Mocha = require("mocha");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

var dirname = typeof __dirname === "undefined" ? undefined : __dirname;

var dirname$1 = dirname === undefined ? undefined : Caml_option.some(dirname);

var Mocha$1 = { };

var Glob$1 = { };

var TestFailure = Caml_exceptions.create("TestSuiteAdapter-AgdaModeVscode.TestFailure");

function run(param) {
  var mocha = new Mocha({
        ui: "bdd",
        color: true
      });
  var testsRoot = Belt_Option.mapWithDefault(dirname$1, "./", (function (dirname) {
          return Path.resolve(dirname, "tests");
        }));
  return new Promise((function (resolve, reject) {
                Glob("**/*.js", {
                      cwd: testsRoot
                    }, (function (err, files) {
                        if (!(err == null)) {
                          return reject(err);
                        }
                        Belt_Array.forEach(files, (function (file) {
                                mocha.addFile(Path.resolve(testsRoot, file));
                                
                              }));
                        try {
                          mocha.run((function (failures) {
                                  if (failures > 0) {
                                    return reject([
                                                TestFailure,
                                                String(failures) + " tests failed."
                                              ]);
                                  } else {
                                    return resolve(true);
                                  }
                                }));
                          return ;
                        }
                        catch (raw_exn){
                          var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                          console.log(exn);
                          return reject(exn);
                        }
                      }));
                
              }));
}

exports.dirname = dirname$1;
exports.Mocha = Mocha$1;
exports.Glob = Glob$1;
exports.TestFailure = TestFailure;
exports.run = run;
/* dirname Not a pure module */