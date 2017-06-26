/**
 * Manage all logic related to manupilating qa pairs and predicting the response
 */
import { IAnswerme } from './interface';

export class Answerme implements IAnswerme {
    constructor(
        private QASource: Array<{ question: string, answers: string[] }>
    ) {
        console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }

    /**
     * @param question
     */
    public ask(question: string): Promise<string> {
        const answer = this.QASource.find(qa => qa.question === question).answers[0];
        return Promise.resolve(answer);
    }

    public answer(question: string, answer: string):
        Promise<boolean> {
        const qa = this.QASource.find(qai => qai.question === question);
        const isCorrect = qa && qa.answers.some(a => a === answer);
        return Promise.resolve(isCorrect);
    }

    public register(question: string, answers: string[]):
        Promise<boolean> {
        const qa = this.QASource.find(qai => qai.question === question);
        if (qa) {
            answers.push(...qa.answers);
        }

        return this.cleanRegister(question, answers);
    }

    public cleanRegister(question: string, answers: string[]):
        Promise<boolean> {
        let qa = this.QASource.find(qai => qai.question === question);
        if (!qa) {
            qa = { question, answers };
            this.QASource.push(qa);
        } else {
            qa.answers = answers;
        }

        return Promise.resolve(true);
    }

}

// export default Answerme;