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
    /**
     * @param question
     */


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

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Answerme$2 = function () {
    function Answerme(QASource) {
        _classCallCheck$1(this, Answerme);

        this.QASource = QASource;
        // @TODO this does not apply anymore, we'll have to think of a solution in the future
        // console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }

    _createClass$1(Answerme, [{
        key: "ask",
        value: function ask(question) {
            return this.QASource.find(function (qa) {
                return qa.question === question;
            }).then(function (qapair) {
                return qapair.answers[0];
            });
        }
    }, {
        key: "answer",
        value: function answer(question, _answer) {
            return this.QASource.find(function (qa) {
                return qa.question === question;
            }).then(function (qa) {
                var isCorrect = qa && qa.answers.some(function (a) {
                    return a === _answer;
                });
                return isCorrect;
            });
        }
    }, {
        key: "register",
        value: function register(question, answers) {
            var _this = this;

            return this.QASource.find(function (qa) {
                return qa.question === question;
            }).then(function (qa) {
                if (qa) {
                    answers.push.apply(answers, _toConsumableArray$1(qa.answers));
                }
                return _this.cleanRegister(question, answers);
            });
        }
    }, {
        key: "cleanRegister",
        value: function cleanRegister(question, answers) {
            var _this2 = this;

            return this.QASource.find(function (qa) {
                return qa.question === question;
            }).then(function (qa) {
                if (!qa) {
                    var _qa = { question: question, answers: answers };
                    return _this2.QASource.push(_qa).then(function () {
                        return true;
                    });
                }
                qa.answers = answers;
                return Promise.resolve(true);
            });
        }
    }]);

    return Answerme;
}();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayAdapter$1 = function () {
    /**
     * we use rest parameter so that the user can add
     * as many items as they want during instantiation
     */
    function ArrayAdapter() {
        _classCallCheck$2(this, ArrayAdapter);

        for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
            items[_key] = arguments[_key];
        }

        this.baseArray = items;
    }

    _createClass$2(ArrayAdapter, [{
        key: "push",
        value: function push(item) {
            this.baseArray.push(item);
            return Promise.resolve(item);
        }
    }, {
        key: "pop",
        value: function pop() {
            var item = this.baseArray.pop();
            return Promise.resolve(item);
        }
    }, {
        key: "filter",
        value: function filter(funct) {
            var list = this.baseArray.filter(funct);
            return Promise.resolve(list);
        }
    }, {
        key: "find",
        value: function find(funct) {
            var item = this.baseArray.find(funct);
            return Promise.resolve(item);
        }
    }]);

    return ArrayAdapter;
}();

// for being able to call it inside a javascript (es5) file
exports = Answerme$1;
// for being able to call it inside typescript and (es6) files
var Answerme$$1 = Answerme$1;
var AnswermeWithAdapter = Answerme$2;
var ArrayAdapter$$1 = ArrayAdapter$1;
// Nodejs exposes module.exports reference
// source: http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
module.exports = exports;

exports.Answerme = Answerme$$1;
exports.AnswermeWithAdapter = AnswermeWithAdapter;
exports.ArrayAdapter = ArrayAdapter$$1;
exports['default'] = Answerme$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2NvbXBpbGVkL2Fuc3dlcm1lL2NvbnRyb2xsZXIuanMiLCIuLi9jb21waWxlZC9hbnN3ZXJtZS1leHQxL2NvbnRyb2xsZXIuanMiLCIuLi9jb21waWxlZC9hbnN3ZXJtZS1leHQxL2FycmF5LWFkYXB0ZXIvY29udHJvbGxlci5qcyIsIi4uL2NvbXBpbGVkL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBbnN3ZXJtZSB7XG4gICAgY29uc3RydWN0b3IoUUFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5RQVNvdXJjZSA9IFFBU291cmNlO1xuICAgICAgICBjb25zb2xlLmFzc2VydChRQVNvdXJjZS5sZW5ndGggPiAwLCAnUUFTb3VyY2UgbXVzdCBhbHdheXMgYmUgYW4gbm9uLWVtcHR5IGFycmF5Jyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBxdWVzdGlvblxuICAgICAqL1xuICAgIGFzayhxdWVzdGlvbikge1xuICAgICAgICBsZXQgYW5zd2VyID0gdGhpcy5RQVNvdXJjZS5maW5kKHFhID0+IHFhLnF1ZXN0aW9uID09PSBxdWVzdGlvbikuYW5zd2Vyc1swXTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhbnN3ZXIpO1xuICAgIH1cbiAgICBhbnN3ZXIocXVlc3Rpb24sIGFuc3dlcikge1xuICAgICAgICBsZXQgcWEgPSB0aGlzLlFBU291cmNlLmZpbmQocWEgPT4gcWEucXVlc3Rpb24gPT09IHF1ZXN0aW9uKTtcbiAgICAgICAgbGV0IGlzQ29ycmVjdCA9IHFhICYmIHFhLmFuc3dlcnMuc29tZShhID0+IGEgPT09IGFuc3dlcik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXNDb3JyZWN0KTtcbiAgICB9XG4gICAgcmVnaXN0ZXIocXVlc3Rpb24sIGFuc3dlcnMpIHtcbiAgICAgICAgbGV0IHFhID0gdGhpcy5RQVNvdXJjZS5maW5kKHFhID0+IHFhLnF1ZXN0aW9uID09PSBxdWVzdGlvbik7XG4gICAgICAgIGlmIChxYSkge1xuICAgICAgICAgICAgYW5zd2Vycy5wdXNoKC4uLnFhLmFuc3dlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFuUmVnaXN0ZXIocXVlc3Rpb24sIGFuc3dlcnMpO1xuICAgIH1cbiAgICBjbGVhblJlZ2lzdGVyKHF1ZXN0aW9uLCBhbnN3ZXJzKSB7XG4gICAgICAgIGxldCBxYSA9IHRoaXMuUUFTb3VyY2UuZmluZChxYSA9PiBxYS5xdWVzdGlvbiA9PT0gcXVlc3Rpb24pO1xuICAgICAgICBpZiAoIXFhKSB7XG4gICAgICAgICAgICBsZXQgcWEgPSB7IHF1ZXN0aW9uLCBhbnN3ZXJzIH07XG4gICAgICAgICAgICB0aGlzLlFBU291cmNlLnB1c2gocWEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcWEuYW5zd2VycyA9IGFuc3dlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICB9XG59XG4vLyBleHBvcnQgZGVmYXVsdCBBbnN3ZXJtZTsgXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sbGVyLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBBbnN3ZXJtZSB7XG4gICAgY29uc3RydWN0b3IoUUFTb3VyY2UpIHtcbiAgICAgICAgdGhpcy5RQVNvdXJjZSA9IFFBU291cmNlO1xuICAgICAgICAvLyBAVE9ETyB0aGlzIGRvZXMgbm90IGFwcGx5IGFueW1vcmUsIHdlJ2xsIGhhdmUgdG8gdGhpbmsgb2YgYSBzb2x1dGlvbiBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vIGNvbnNvbGUuYXNzZXJ0KFFBU291cmNlLmxlbmd0aCA+IDAsICdRQVNvdXJjZSBtdXN0IGFsd2F5cyBiZSBhbiBub24tZW1wdHkgYXJyYXknKTtcbiAgICB9XG4gICAgYXNrKHF1ZXN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlFBU291cmNlLmZpbmQoKHFhKSA9PiBxYS5xdWVzdGlvbiA9PT0gcXVlc3Rpb24pXG4gICAgICAgICAgICAudGhlbihxYXBhaXIgPT4gcWFwYWlyLmFuc3dlcnNbMF0pO1xuICAgIH1cbiAgICBhbnN3ZXIocXVlc3Rpb24sIGFuc3dlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5RQVNvdXJjZS5maW5kKChxYSkgPT4gcWEucXVlc3Rpb24gPT09IHF1ZXN0aW9uKVxuICAgICAgICAgICAgLnRoZW4oKHFhKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNDb3JyZWN0ID0gcWEgJiYgcWEuYW5zd2Vycy5zb21lKGEgPT4gYSA9PT0gYW5zd2VyKTtcbiAgICAgICAgICAgIHJldHVybiBpc0NvcnJlY3Q7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZWdpc3RlcihxdWVzdGlvbiwgYW5zd2Vycykge1xuICAgICAgICByZXR1cm4gdGhpcy5RQVNvdXJjZS5maW5kKChxYSkgPT4gcWEucXVlc3Rpb24gPT09IHF1ZXN0aW9uKVxuICAgICAgICAgICAgLnRoZW4oKHFhKSA9PiB7XG4gICAgICAgICAgICBpZiAocWEpIHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLnB1c2goLi4ucWEuYW5zd2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhblJlZ2lzdGVyKHF1ZXN0aW9uLCBhbnN3ZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsZWFuUmVnaXN0ZXIocXVlc3Rpb24sIGFuc3dlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuUUFTb3VyY2UuZmluZCgocWEpID0+IHFhLnF1ZXN0aW9uID09PSBxdWVzdGlvbilcbiAgICAgICAgICAgIC50aGVuKChxYSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFxYSkge1xuICAgICAgICAgICAgICAgIGxldCBxYSA9IHsgcXVlc3Rpb24sIGFuc3dlcnMgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5RQVNvdXJjZS5wdXNoKHFhKS50aGVuKCgpID0+IHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcWEuYW5zd2VycyA9IGFuc3dlcnM7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBleHBvcnQgZGVmYXVsdCBBbnN3ZXJtZTsgXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sbGVyLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBBcnJheUFkYXB0ZXIge1xuICAgIC8qKlxuICAgICAqIHdlIHVzZSByZXN0IHBhcmFtZXRlciBzbyB0aGF0IHRoZSB1c2VyIGNhbiBhZGRcbiAgICAgKiBhcyBtYW55IGl0ZW1zIGFzIHRoZXkgd2FudCBkdXJpbmcgaW5zdGFudGlhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuYmFzZUFycmF5ID0gaXRlbXM7XG4gICAgfVxuICAgIHB1c2goaXRlbSkge1xuICAgICAgICB0aGlzLmJhc2VBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGl0ZW0pO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5iYXNlQXJyYXkucG9wKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuICAgIGZpbHRlcihmdW5jdCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuYmFzZUFycmF5LmZpbHRlcihmdW5jdCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobGlzdCk7XG4gICAgfVxuICAgIGZpbmQoZnVuY3QpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmJhc2VBcnJheS5maW5kKGZ1bmN0KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBcnJheUFkYXB0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250cm9sbGVyLmpzLm1hcCIsImltcG9ydCB7IEFuc3dlcm1lIGFzIEFuc3dlcm1lQ2xhc3MgfSBmcm9tICcuL2Fuc3dlcm1lL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgQW5zd2VybWUgYXMgQW5zd2VybWVXaXRoQWRhcHRlckNsYXNzIH0gZnJvbSAnLi9hbnN3ZXJtZS1leHQxL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgQXJyYXlBZGFwdGVyIGFzIEFycmF5QWRhcHRlckNsYXNzIH0gZnJvbSAnLi9hbnN3ZXJtZS1leHQxL2FycmF5LWFkYXB0ZXIvY29udHJvbGxlcic7XG4vLyBmb3IgYmVpbmcgYWJsZSB0byBjYWxsIGl0IGluc2lkZSBhIGphdmFzY3JpcHQgKGVzNSkgZmlsZVxuZXhwb3J0cyA9IEFuc3dlcm1lQ2xhc3M7XG4vLyBmb3IgYmVpbmcgYWJsZSB0byBjYWxsIGl0IGluc2lkZSB0eXBlc2NyaXB0IGFuZCAoZXM2KSBmaWxlc1xuZXhwb3J0IGNvbnN0IEFuc3dlcm1lID0gQW5zd2VybWVDbGFzcztcbmV4cG9ydCBjb25zdCBBbnN3ZXJtZVdpdGhBZGFwdGVyID0gQW5zd2VybWVXaXRoQWRhcHRlckNsYXNzO1xuZXhwb3J0IGNvbnN0IEFycmF5QWRhcHRlciA9IEFycmF5QWRhcHRlckNsYXNzO1xuZXhwb3J0IGRlZmF1bHQgQW5zd2VybWVDbGFzcztcbi8vIE5vZGVqcyBleHBvc2VzIG1vZHVsZS5leHBvcnRzIHJlZmVyZW5jZVxuLy8gc291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcxMzczOTcvbW9kdWxlLWV4cG9ydHMtdnMtZXhwb3J0cy1pbi1ub2RlLWpzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOlsiQW5zd2VybWUiLCJRQVNvdXJjZSIsImFzc2VydCIsImxlbmd0aCIsInF1ZXN0aW9uIiwiYW5zd2VyIiwiZmluZCIsInFhIiwiYW5zd2VycyIsIlByb21pc2UiLCJyZXNvbHZlIiwiaXNDb3JyZWN0Iiwic29tZSIsImEiLCJwdXNoIiwiY2xlYW5SZWdpc3RlciIsInRoZW4iLCJxYXBhaXIiLCJBcnJheUFkYXB0ZXIiLCJpdGVtcyIsImJhc2VBcnJheSIsIml0ZW0iLCJwb3AiLCJmdW5jdCIsImxpc3QiLCJmaWx0ZXIiLCJleHBvcnRzIiwiQW5zd2VybWVDbGFzcyIsIkFuc3dlcm1lV2l0aEFkYXB0ZXIiLCJBbnN3ZXJtZVdpdGhBZGFwdGVyQ2xhc3MiLCJBcnJheUFkYXB0ZXJDbGFzcyIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFhQTtzQkFDR0MsUUFBWixFQUFzQjs7O2FBQ2JBLFFBQUwsR0FBZ0JBLFFBQWhCO2dCQUNRQyxNQUFSLENBQWVELFNBQVNFLE1BQVQsR0FBa0IsQ0FBakMsRUFBb0MsNENBQXBDOzs7Ozs7Ozs7NEJBS0FDLFVBQVU7Z0JBQ05DLFNBQVMsS0FBS0osUUFBTCxDQUFjSyxJQUFkLENBQW1CO3VCQUFNQyxHQUFHSCxRQUFILEtBQWdCQSxRQUF0QjthQUFuQixFQUFtREksT0FBbkQsQ0FBMkQsQ0FBM0QsQ0FBYjttQkFDT0MsUUFBUUMsT0FBUixDQUFnQkwsTUFBaEIsQ0FBUDs7OzsrQkFFR0QsVUFBVUMsU0FBUTtnQkFDakJFLEtBQUssS0FBS04sUUFBTCxDQUFjSyxJQUFkLENBQW1CO3VCQUFNQyxHQUFHSCxRQUFILEtBQWdCQSxRQUF0QjthQUFuQixDQUFUO2dCQUNJTyxZQUFZSixNQUFNQSxHQUFHQyxPQUFILENBQVdJLElBQVgsQ0FBZ0I7dUJBQUtDLE1BQU1SLE9BQVg7YUFBaEIsQ0FBdEI7bUJBQ09JLFFBQVFDLE9BQVIsQ0FBZ0JDLFNBQWhCLENBQVA7Ozs7aUNBRUtQLFVBQVVJLFNBQVM7Z0JBQ3BCRCxLQUFLLEtBQUtOLFFBQUwsQ0FBY0ssSUFBZCxDQUFtQjt1QkFBTUMsR0FBR0gsUUFBSCxLQUFnQkEsUUFBdEI7YUFBbkIsQ0FBVDtnQkFDSUcsRUFBSixFQUFRO3dC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
