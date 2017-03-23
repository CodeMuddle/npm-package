/**
 * Manage all logic related to manupilating qa pairs and predicting the response
 */

import { AnswermeInterface } from './interface';

export class Answerme implements AnswermeInterface {
    constructor(
        private QASource: Array<{ question: string, answers: Array<string> }>
        ) {
    }
}