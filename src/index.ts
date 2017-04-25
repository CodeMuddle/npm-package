import { Answerme as AnswermeClass } from './answerme/controller';
import { Answerme as AnswermeWithAdapterClass } from './answerme-ext1/controller';

import { ArrayAdapter as ArrayAdapterClass } from './answerme-ext1/array-adapter/controller';

// for being able to call it inside a javascript (es5) file
exports = AnswermeClass;

// for being able to call it inside typescript and (es6) files
export const Answerme = AnswermeClass;
export const AnswermeWithAdapter = AnswermeWithAdapterClass;
export const ArrayAdapter = ArrayAdapterClass;

export default AnswermeClass;

// Nodejs exposes module.exports reference
// source: http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
module.exports = exports;