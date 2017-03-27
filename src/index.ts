import { Answerme as AnswermeClass } from './answerme/controller';

// for being able to call it inside a javascript (es5) file
exports = AnswermeClass;

// for being able to call it inside typescript and (es6) files
export const Answerme = AnswermeClass;

export default AnswermeClass;

// Nodejs exposes module.exports reference
// source: http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
module.exports = exports;