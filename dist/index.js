'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Answerme$1 = function () {
    function Answerme(QASource) {
        _classCallCheck(this, Answerme);

        this.QASource = QASource;
        console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }

    _createClass(Answerme, [{
        key: 'ask',
        value: function ask(question) {
            var answer = this.QASource.find(function (qa) {
                return qa.question === question;
            }).answers[0];
            return Promise.resolve(answer);
        }
    }, {
        key: 'answer',
        value: function answer(question, _answer) {
            var qa = this.QASource.find(function (qa) {
                return qa.question === question;
            });
            var isCorrect = qa && qa.answers.some(function (a) {
                return a === _answer;
            });
            return Promise.resolve(isCorrect);
        }
    }, {
        key: 'register',
        value: function register(question, answers) {
            var qa = this.QASource.find(function (qa) {
                return qa.question === question;
            });
            if (qa) {
                answers.push.apply(answers, _toConsumableArray(qa.answers));
            }
            return this.cleanRegister(question, answers);
        }
    }, {
        key: 'cleanRegister',
        value: function cleanRegister(question, answers) {
            var qa = this.QASource.find(function (qa) {
                return qa.question === question;
            });
            if (!qa) {
                var _qa = { question: question, answers: answers };
                this.QASource.push(_qa);
            } else {
                qa.answers = answers;
            }
            return Promise.resolve(true);
        }
    }]);

    return Answerme;
}();

// for being able to call it inside a javascript (es5) file
exports = Answerme$1;
// for being able to call it inside typescript and (es6) files
var Answerme$$1 = Answerme$1;
// Nodejs exposes module.exports reference
// source: http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
module.exports = exports;

exports.Answerme = Answerme$$1;
exports['default'] = Answerme$1;
