/**
 * ArrayAdapter allows us to do more with array methods
 * since the definition is all about promised results,
 * We can for example log the savedItem to a remote server before telling
 * the user that we have saved their item!
 */
import { AdapterInterface } from './interface';

export class ArrayAdapter<ITEM> implements AdapterInterface<ITEM>{
    private baseArray: Array<ITEM>;
    /**
     * we use rest parameter so that the user can add 
     * as many items as they want during instantiation
     */
    constructor(...items: Array<ITEM>) {
        this.baseArray = items;
    }

    push(item: ITEM): Promise<ITEM> {
        this.baseArray.push(item);
        return Promise.resolve(item);
    }

    pop(): Promise<ITEM> {
        let item = this.baseArray.pop();
        return Promise.resolve(item);
    }


    filter(funct: any): Promise<Array<ITEM>> {
        let list = this.baseArray.filter(funct);
        return Promise.resolve(list);
    }


    find(funct: any): Promise<ITEM> {
        let item = this.baseArray.find(funct);
        return Promise.resolve(item);
    }
}

export default ArrayAdapter;