// inside __tests__/index-test.ts
// import Answerme from 'answerme'; 
import { Answerme } from '../dist/index.js';
describe('Testing ask function of Question Answering System', () => {
    beforeEach(() => {
        console.log('About to run the index-test.ts test');
        console.log(Answerme);
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', async () => {
        const question = 'where is drake from?';
        let answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{ question, answers }];
        let answerme = new Answerme(QASource);
        let predictedAnswer = await answerme.ask(question);
        let realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});