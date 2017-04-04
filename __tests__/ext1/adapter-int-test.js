'use strict';
// inside __tests__/ext1/adapter-int-test.js
// var Answerme = require('answerme');
var ArrayAdapter = require('../../dist/index.js').ArrayAdapter;
var AnswermeWithAdapter = require('../../dist/index.js').AnswermeWithAdapter;
describe('Testing ask function of Question Answering System', function () {
    beforeEach(function () {
        console.log('About to run the index-test.js test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', function () {
        var question = 'where is drake from?';
        var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = new ArrayAdapter({
            question: question,
            answers: answers
        });
        var answerme = new AnswermeWithAdapter(QASource);
        answerme.ask(question).then(predictedAnswer => {
            var realAnswers = answers;
            console.log('--------\n', predictedAnswer, '\n--------');
            expect(realAnswers).toContain(predictedAnswer);
        });
    });
});