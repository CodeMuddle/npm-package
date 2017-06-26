export interface IAnswerme {
    /**
     * ask a question
     * The outside user asks a question to the system
     * @param question
     * @returns Promise<string> the probable answer
     */
    ask(question: string): Promise<string>;

    /**
     * respond to a question
     * The user specify the question and the answer so that the system 
     * can tell them whether they are correct or not
     * @param question
     * @param answer
     * @returns Promise<boolean> whether the answer given by user is correct or not
     */
    answer(question: string, answer: string): Promise<boolean>;

    /**
     * register a new qa pair
     * if the question exists, then answers will be added to the existing ones
     * @param question string
     * @param answer string[]
     * @returns Promise<boolean> whether the qa pair has been saved or not
     */
    register(question: string, answers: string[]): Promise<boolean>;

    /**
     * update existing qa pair or create new one
     * if the question exists, then answers will replace existing ones
     * @param question string
     * @param answer string[]
     * @returns Promise<boolean> whether the qa pair has been saved or not
     */
    cleanRegister(question: string, answers: string[]): Promise<boolean>;


}
