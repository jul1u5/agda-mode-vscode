// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Caml = require("rescript/lib/js/caml.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Translator$AgdaModeVscode = require("../../InputMethod/Translator.bs.js");
var CandidateSymbols$AgdaModeVscode = require("./CandidateSymbols.bs.js");

function reducer(state, action) {
  if (typeof action === "number") {
    if (action === 1) {
      return ;
    }
    if (action === 0) {
      var translation = Translator$AgdaModeVscode.translate("");
      return {
              sequence: "",
              translation: translation,
              candidateIndex: 0
            };
    }
    
  }
  if (state === undefined) {
    return ;
  }
  if (typeof action !== "number") {
    return {
            sequence: action._0,
            translation: action._1,
            candidateIndex: action._2
          };
  }
  switch (action) {
    case /* BrowseUp */2 :
        return {
                sequence: state.sequence,
                translation: state.translation,
                candidateIndex: Caml.caml_int_max(0, state.candidateIndex - 10 | 0)
              };
    case /* BrowseRight */3 :
        return {
                sequence: state.sequence,
                translation: state.translation,
                candidateIndex: Caml.caml_int_min(state.translation.candidateSymbols.length - 1 | 0, state.candidateIndex + 1 | 0)
              };
    case /* BrowseDown */4 :
        return {
                sequence: state.sequence,
                translation: state.translation,
                candidateIndex: Caml.caml_int_min(state.translation.candidateSymbols.length - 1 | 0, state.candidateIndex + 10 | 0)
              };
    case /* BrowseLeft */5 :
        return {
                sequence: state.sequence,
                translation: state.translation,
                candidateIndex: Caml.caml_int_max(0, state.candidateIndex - 1 | 0)
              };
    
  }
}

function Keyboard(Props) {
  var state = Props.state;
  var onInsertChar = Props.onInsertChar;
  var onChooseSymbol = Props.onChooseSymbol;
  var prompting = Props.prompting;
  if (state === undefined) {
    return React.createElement("div", {
                className: "agda-mode-keyboard deactivated"
              });
  }
  var translation = state.translation;
  return React.createElement("div", {
              className: "agda-mode-keyboard" + (
                prompting ? " prompting" : ""
              )
            }, React.createElement("div", {
                  className: "agda-mode-keyboard-sequence-and-candidates"
                }, React.createElement("div", {
                      className: "agda-mode-keyboard-sequence"
                    }, state.sequence), React.createElement(CandidateSymbols$AgdaModeVscode.make, {
                      candidates: translation.candidateSymbols,
                      index: state.candidateIndex,
                      onChooseSymbol: onChooseSymbol
                    })), React.createElement("div", {
                  className: "agda-mode-keyboard-suggestions"
                }, Belt_Array.map(translation.keySuggestions, (function (key) {
                        return React.createElement("button", {
                                    key: key,
                                    className: "agda-mode-key",
                                    onClick: (function (param) {
                                        return Curry._1(onInsertChar, key);
                                      })
                                  }, key);
                      }))));
}

var make = Keyboard;

exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
