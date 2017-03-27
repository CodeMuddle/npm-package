// inside __tests__/index.js
'use strict';
// var Answerme = require('answerme');
var Answerme = require('../dist/index.js');
describe('Testing ask function of Question Answering System', function() {
    beforeEach(function() {
        console.log('About to run the index.js test', Answerme, Object.keys(Answerme));
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', function() {
        var question = 'where is drake from?';
        var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{ 
            question: question, 
            answers: answers
        }];
        var answerme = new Answerme(QASource);
        var predictedAnswer = answerme.ask(question);
        var realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});