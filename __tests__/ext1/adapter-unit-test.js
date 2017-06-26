'use strict';
// inside __tests__/ext1/adapter-unit-test.js
// var ArrayAdapter = require('answerme').ArrayAdapter;
var ArrayAdapter = require('../../dist/index.js').ArrayAdapter;

describe('Testing ask function of Question Answering System', function() {
	beforeEach(function() {
		console.log('About to run the index-test.js test');
	});
	test('test', function() {
		expect(1).toEqual(1);
	});
	// question: where is drake from?
	// answers: 'Canada', 'Toronto, Canada'
	test('the asked question has an answer', function() {
		var question = 'where is drake from?';
		var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
		var QASource = [
			{
				question: question,
				answers: answers,
			},
		];
		var arrayAdapter = new ArrayAdapter({
			question: question,
			answers: answers,
		});
		arrayAdapter.find(qa => qa.question === question).then(savedRecord => {
			expect(savedRecord).toEqual(QASource[0]);
		});
	});
});
