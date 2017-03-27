'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./answerme/controller');

Object.keys(_controller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _controller[key];
    }
  });
});

// for being able to call it inside a javascript (es5) file
// for being able to call it inside typescript and (es6) files
console.log(new _controller.Answerme([{ question: '', answers: [] }]));
exports.default = _controller.Answerme;
// exports = Answerme;
// exports.Answerme = Answerme;
//# sourceMappingURL=index.js.map