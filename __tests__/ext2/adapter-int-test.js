'use strict';
// inside __tests__/ext1/adapter-int-test.js
// var Answerme = require('answerme');
var GsheetAdapter = require('../../dist/index.js').GsheetAdapter;
var AnswermeWithAdapter = require('../../dist/index.js').AnswermeWithAdapter;
describe('Testing ask function of Question Answering System', function () {
    beforeEach(function () {
        console.log('About to run the index-test.js test');
    });
    test('test', function () {
        expect(1).toEqual(1);
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
});