export * from './answerme/controller';
import { Answerme } from './answerme/controller';
// for being able to call it inside a javascript (es5) file
// for being able to call it inside typescript and (es6) files
console.log(new Answerme([{ question: '', answers: [] }]));
export default Answerme;
// exports = Answerme;
// exports.Answerme = Answerme;
//# sourceMappingURL=index.js.map