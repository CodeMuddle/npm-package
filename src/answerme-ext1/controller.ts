/**
 * Manage all logic related to manupilating qa pairs and predicting the response
 */
import { AnswermeInterface } from './interface';
import { AdapterInterface } from './array-adapter/interface';

export interface QApair {
    question: string;
    answers: Array<string>;
}

export class Answerme implements AnswermeInterface {
    constructor(
        private QASource: AdapterInterface<QApair>
    ) {
        // @TODO this does not apply anymore, we'll have to think of a solution in the future
        // console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }

    public ask(question: string): Promise<string> {
        return this.QASource.find((qa: QApair) => qa.question === question)
            .then(qapair => qapair.answers[0]);
    }

    public answer(question: string, answer: string):
        Promise<boolean> {
        return this.QASource.find((qa: QApair) => qa.question === question)
            .then((qa: QApair) => {
                let isCorrect = qa && qa.answers.some(a => a === answer);
                return isCorrect;
            });
    }

    public register(question: string, answers: Array<string>):
        Promise<boolean> {
        return this.QASource.find((qa: QApair) => qa.question === question)
            .then((qa: QApair) => {
                if (qa) {
                    answers.push(...qa.answers);
                }

                return this.cleanRegister(question, answers);
            });

    }

    public cleanRegister(question: string, answers: Array<string>):
        Promise<boolean> {
        return this.QASource.find((qa: QApair) => qa.question === question)
        .then((qa: QApair) => {

            if (!qa) {
                let qa = { question, answers };
                return this.QASource.push(qa).then(() => true);
            }
            qa.answers = answers;
            return Promise.resolve(true);


        });

    }

}

// export default Answerme;