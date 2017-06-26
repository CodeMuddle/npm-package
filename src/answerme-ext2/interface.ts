export interface IAdapter<ITEM> {
    /**
     * add an item to an array
     * @NOTE we cannot return void, so we return the pushed element instead
     * @param item
     * @returns Promise<ITEM> the probable answer
     */
    push(item: ITEM): Promise<ITEM>;

    /**
     * remove an item from the array
     * @returns Promise<ITEM> whether the answer given by user is correct or not
     */
    pop(): Promise<ITEM>;

    /**
     * fetch a list of items from the array
     * @param funct Function that returns a boolean
     * @returns Promise<Array<ITEM>>
     */
    filter(funct: any): Promise<ITEM[]>;

    /**
     * fetch one item from the array
     * @param funct Function that returns a boolean
     * @returns Promise<ITEM>
     */
    find(funct: any): Promise<ITEM>;


}
