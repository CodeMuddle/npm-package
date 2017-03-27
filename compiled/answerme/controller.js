export class Answerme {
    constructor(QASource) {
        this.QASource = QASource;
        console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }
    ask(question) {
        let answer = this.QASource.find(qa => qa.question === question).answers[0];
        return Promise.resolve(answer);
    }
    answer(question, answer) {
        let qa = this.QASource.find(qa => qa.question === question);
        let isCorrect = qa && qa.answers.some(a => a === answer);
        return Promise.resolve(isCorrect);
    }
    register(question, answers) {
        let qa = this.QASource.find(qa => qa.question === question);
        if (qa) {
            answers.push(...qa.answers);
        }
        return this.cleanRegister(question, answers);
    }
    cleanRegister(question, answers) {
        let qa = this.QASource.find(qa => qa.question === question);
        if (!qa) {
            let qa = { question, answers };
            this.QASource.push(qa);
        }
        else {
            qa.answers = answers;
        }
        return Promise.resolve(true);
    }
}
export default Answerme;
//# sourceMappingURL=controller.js.map