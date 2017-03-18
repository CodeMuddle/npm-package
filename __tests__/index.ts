// inside __tests__/index.ts
describe('Testing ask function of Question Answering System', () => {
    beforeEach(() => {
        console.log('About to run the index.ts test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', () => {
        const question = 'where is drake from?';
        let answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{ question, answers }];
        let sakwesakwe = new Sakwesakwe(QASource);
        let predictedAnswer = sakwesakwe.ask(question);
        let realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});