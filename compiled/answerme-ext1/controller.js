export class Answerme {
    constructor(QASource) {
        this.QASource = QASource;
        // @TODO this does not apply anymore, we'll have to think of a solution in the future
        // console.assert(QASource.length > 0, 'QASource must always be an non-empty array');
    }
    ask(question) {
        return this.QASource.find((qa) => qa.question === question)
            .then(qapair => qapair.answers[0]);
    }
    answer(question, answer) {
        return this.QASource.find((qa) => qa.question === question)
            .then((qa) => {
            let isCorrect = qa && qa.answers.some(a => a === answer);
            return isCorrect;
        });
    }
    register(question, answers) {
        return this.QASource.find((qa) => qa.question === question)
            .then((qa) => {
            if (qa) {
                answers.push(...qa.answers);
            }
            return this.cleanRegister(question, answers);
        });
    }
    cleanRegister(question, answers) {
        return this.QASource.find((qa) => qa.question === question)
            .then((qa) => {
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
//# sourceMappingURL=controller.js.map