'use strict';
// inside __tests__/index-test.js
// var Answerme = require('answerme');
// import { ArrayAdapter } from '../../dist/index.js';
// import { AnswermeWithAdapter } from '../../dist/index.js';
describe('Testing ask function of Question Answering System', function () {
    beforeEach(function () {
        console.log('About to run the index-test.js test');
    });
    test('test', function () {
        expect(1).toEqual(1);
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    // test('the asked question has an answer', function () {
    //     var question = 'where is drake from?';
    //     var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
    //     var QASource = 
    //     new ArrayAdapter<{ question: string, answers: Array<string> }>
    //     ({
    //         question, answers
    //     });
    //     var answerme = new AnswermeWithAdapter(QASource);
    //     answerme.ask(question).then(predictedAnswer => {
    //         var realAnswers = answers;
    //         console.log('--------\n', predictedAnswer, '\n--------');
    //         expect(realAnswers).toContain(predictedAnswer);
    //     });
    // });


});