'use strict';
// inside __tests__/ext2/adapter-unit-test.js
// var GsheetAdapter = require('answerme').GsheetAdapter;
var GsheetAdapter = require('../../dist/index.js').GsheetAdapter;
var GsheetService = GsheetAdapter.GsheetService;

describe('Testing ask function of Question Answering System', function () {
    beforeEach(function () {
        console.log('About to run the index-test.js test');
    });
    test('read method', function () {
        // credentialsFile is downloaded from google
        // tokenStore path (excluding the file-name) to where the generated token, will be saved
        let gsheetService = new GsheetService(docId, credentials, tokenStore);

        // read content of cell A1
        // @returns { name: 'A1', content: string }
        // read content of cell A1, located in tab named EXPLANATIONS_TABLE
        let cellA1 = { name: 'A1', content: 'John' };
        gsheetService.read('A1', 'EXPLANATIONS_TABLE').then(result => {
            expect(result).toEqual(cellA1);            
        });
        // read content of cell A1 and A2
    });
    test('write method', function () {
        let gsheetService = new GsheetService(docId, credentialsFile, tokenStore);
        // let cellA1 = gsheetService.write({ name: 'A1', content: 'John' });
        let cellA1 = { name: 'A1', content: 'John' };
        gsheetService.write('John', 'A1', 'EXPLANATIONS_TABLE').then(result => {
            expect(result).toEqual(cellA1);            
        });
    });
    test('update method', function () {

    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', function () {
        var question = 'where is drake from?';
        var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{
            question: question,
            answers: answers
        }];
        var gsheetAdapter = new GsheetAdapter({
            question: question,
            answers: answers
        });
        gsheetAdapter.find(qa => qa.question === question)
            .then(savedRecord => {
                expect(savedRecord).toEqual(QASource[0]);
            });
    });
});