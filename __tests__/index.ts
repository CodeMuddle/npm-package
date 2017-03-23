// inside __tests__/index.ts
// import Answerme from 'answerme'; 
import Answerme from '../dist/index.js';
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
        let answerme = new Answerme(QASource);
        let predictedAnswer = answerme.ask(question);
        let realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});