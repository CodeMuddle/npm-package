'use strict';
// inside __tests__/ext2/adapter-unit-test.js
// var GsheetAdapter = require('answerme').GsheetAdapter;
var GsheetAdapter = require('../../dist/index.js').GsheetAdapter;
var GsheetService = GsheetAdapter.GsheetService;

// provide all info needed to identify the google sheet you want to read/write from
const tokenStore = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
const docId = '12LLE-BdUtUCsirqNroThFCc7DSKKfhvUQ-S5Zi1Obkg';
const credentials = { 'installed': { 'client_id': '1017997956763-8598k3vlb705cnobhi786222tjfnstrq.apps.googleusercontent.com', 'project_id': 'amazing-smile-166717', 'auth_uri': 'https://accounts.google.com/o/oauth2/auth', 'token_uri': 'https://accounts.google.com/o/oauth2/token', 'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs', 'client_secret': 'Qg6bAuzIO-q5-6Mbp3OT2RSL', 'redirect_uris': ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'] } };

describe('Testing ask function of Question Answering System', function () {
    beforeEach(function () {
        console.log('About to run the index-unit-test.js test');
    });
    test('read method', function () {
        let gsheetService = new GsheetService(docId, credentials, tokenStore);
        // credentialsFile is downloaded from google
        // tokenStore path (excluding the file-name) to where the generated token, will be saved

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
        let gsheetService = new GsheetService(docId, credentials, tokenStore);
        // let cellA1 = gsheetService.write({ name: 'A1', content: 'John' });
        let cellA1 = { name: 'A1', content: 'John' };
        gsheetService.write('John', 'A1', 'EXPLANATIONS_TABLE').then(result => {
            expect(result).toEqual(cellA1);
        })
            .catch(error => {
                let cantWrite = 'You can only write to an empty cell!';
                expect(error).toEqual(cantWrite);
            });
    });
    // test('update method', function () {

    // });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'

    // test('the asked question has an answer', function () {
    //     var question = 'where is drake from?';
    //     var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
    //     var QASource = [{
    //         question: question,
    //         answers: answers
    //     }];
    //     var gsheetAdapter = new GsheetAdapter({
    //         question: question,
    //         answers: answers
    //     });
    //     gsheetAdapter.find(qa => qa.question === question)
    //         .then(savedRecord => {
    //             expect(savedRecord).toEqual(QASource[0]);
    //         });
    // });


});