export interface AnswermeInterface {
    /**
     * ask a question
     * The outside user asks a question to the system
     */
    ask(question: string): Promise<string>;

    /**
     * respond to a question
     * The user specify the question and the answer so that the system 
     * can tell them whether they are correct or not
     */
    answer(question: string, answer: string): Promise<boolean>;

    /**
     * register a new qa pair
     * if the question exists, then answers will be added to the existing ones
     */
    register(question: string, answers: Array<string>): Promise<boolean>;

    /**
     * update existing qa pair
     * if the question exists, then answers will replace existing ones
     */
    update(question: string, answers: Array<string>): Promise<boolean>;


}

export default AnswermeInterface;