// inside __tests__/index.js
describe('matching cities to foods', function() {
    beforeEach(function() {
        console.log('About to run the index.js test');
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
        var sakwesakwe = new Sakwesakwe(QASource);
        var predictedAnswer = sakwesakwe.ask(question);
        var realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});