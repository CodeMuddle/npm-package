/**
 * Manage all logic related to manupilating qa pairs and predicting the response
 */
import { AnswermeInterface } from './interface';

export class Answerme implements AnswermeInterface {
    constructor(
        private QASource: Array<{ question: string, answers: Array<string> }>
    ) {
        console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }

    /**
     * @param question
     */
    public ask(question: string): Promise<string> {
        let answer = this.QASource.find(qa => qa.question === question).answers[0];
        return Promise.resolve(answer);
    }

    public answer(question: string, answer: string):
        Promise<boolean> {
        let qa = this.QASource.find(qa => qa.question === question);
        let isCorrect = qa && qa.answers.some(a => a === answer);
        return Promise.resolve(isCorrect);
    }

    public register(question: string, answers: Array<string>):
        Promise<boolean> {
        let qa = this.QASource.find(qa => qa.question === question);
        if (qa) {
            answers.push(...qa.answers);
        }

        return this.cleanRegister(question, answers);
    }

    public cleanRegister(question: string, answers: Array<string>):
        Promise<boolean> {
        let qa = this.QASource.find(qa => qa.question === question);
        if (!qa) {
            let qa = { question, answers };
            this.QASource.push(qa);
        } else {
            qa.answers = answers;
        }

        return Promise.resolve(true);
    }

}

// export default Answerme;