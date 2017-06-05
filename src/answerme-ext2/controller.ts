import { defineGsheet, read, write, update, readRange } from './service';
import { AdapterInterface } from './interface';

export class GsheetService {
    private config: { [key: string]: any };
    constructor(docId: string, credentials: { [key: string]: any }, tokenStore: string) {
        this.config = { docId, credentials, tokenStore }
    }

    read(name: string | Array<string>, tab: string) {
        let { docId, credentials, tokenStore } = this.config;
        return defineGsheet(docId, credentials, tokenStore)
            .then(gsheet => {
                // @returns { name: 'A1', content: string }
                return read(name, tab).then(out => out);
            });

    }

    write(content: string, name: string, tab: string) {
        let { docId, credentials, tokenStore } = this.config;
        return defineGsheet(docId, credentials, tokenStore)
            .then(gsheet => {
                // @returns { name: 'A1', content: string }
                return write(content, name, tab).then(out => out);
            });

    }
    update(content: string, name: string, tab: string) {
        let { docId, credentials, tokenStore } = this.config;
        return defineGsheet(docId, credentials, tokenStore)
            .then(gsheet => {
                // @returns { name: 'A1', content: string }
                return update(content, name, tab).then(out => out);
            });

    }
    readRange(name: string, tab: string) {
        let { docId, credentials, tokenStore } = this.config;
        return defineGsheet(docId, credentials, tokenStore)
            .then(gsheet => {
                // @returns { name: 'A1', content: string }
                return readRange(name, tab).then(out => out);
            });

    }
}

export interface QApair {
    question: string;
    answers: Array<string>;
}

export class GsheetAdapter implements AdapterInterface<QApair> {
    public static GsheetService = GsheetService;
    public gsheetService: GsheetService;
    private tab: string;
    /**
     * 
     * @param docId 
     * @param credentials 
     * @param tokenStore 
     * @param tabName the name of sheet tab
     */
    constructor(docId: string, credentials: { [key: string]: any }, tokenStore: string, tabName: string) {
        this.gsheetService = new GsheetService(docId, credentials, tokenStore);
        this.tab = tabName;
    }

    push(item: QApair): Promise<QApair> {
        return (new Promise(resolve => {
            // @TODO find the first empty row
            let emptyRow = '1';
            return resolve(emptyRow);
        }))
            .then((row: string) => {
                return this.writeQApair(row, item);
            });
    }
    /**
     * Removes the last qapair from a google sheet and returns it.
     */
    pop(): Promise<QApair> {
        // @TODO implement logic to remove cell content
        return this.readQApair(1);
    }
    /**
 * fetch one item from the array
 * @param funct Function that returns a boolean
 * @returns Promise<ITEM> 
 */
    find(funct: any): Promise<QApair> {
        // fetch 100 qa pairs
        // pass each question inside the provided function 'funct'
        // the first that makes funct returns true, belongs to the desired qa pair
        // if none found, keep fetching '100' in batch

        // let rows = ['1', '2', '3', '5', '5', '6']; // ... count till 50
        // let rows = (Array.apply(null, { length: 10 })).map((el: any, i: number) => i + 1);

        // return Promise.all(rows.map((row: number) => this.readQApair(row)))
        return this.readQApairs(1, 10)
            .then(qapairs => {
                debugger; // @TODO make sure the returned value is an array of qapairs
                let qapair = qapairs.find(funct); // funct = function(qapair, index){ ... }
                if (!qapair) { /* goto START */ }
                return qapair;
            });
    }
    filter(funct: any): Promise<Array<QApair>> {
        // fetch 100 qa pairs
        // pass each question inside the provided function 'funct'
        // the first that makes funct returns true, belongs to the desired qa pair
        // if none found, keep fetching '100' in batch

        // let rows = ['1', '2', '3', '5', '5', '6']; // ... count till 50
        // let rows = (Array.apply(null, { length: 50 })).map((el: any, i: number) => i + 1);

        // return Promise.all(rows.map((row: number) => this.readQApair(row)))
        return this.readQApairs(1, 10)
            .then(qapairs => {
                debugger; // @TODO make sure the returned value is an array of qapairs
                return qapairs.filter(funct); // funct = function(qapair, index){ ... }
            });
    }
    writeQApair(row: number | string, qapair: QApair): Promise<QApair> {
        let name = `A${row}`; // for question
        let names = [`B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`]; // for answers
        let { question, answers } = qapair;
        return this.gsheetService.write(question, name, this.tab)
            .then(record => {
                let saveAnswers = answers.map((answer, i) => {
                    let name = names[i];
                    return this.gsheetService.write(answer, name, this.tab);
                });
                return Promise.all(saveAnswers);
            })
            .then(() => qapair);
    }
    /**
     * for simplicity, we assume that a question can have at most 5 answers
     * @param row number | string
     */
    readQApair(row: number | string): Promise<QApair> {
        // let names = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1']; // A1 = question and B1-F1 = 5 answers
        let names = [`A${row}`, `B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`];
        return this.gsheetService.read(names, this.tab)
            .then(cellList => { // [{ name, content }]
                let cell = cellList.find((c: any) => c.name === `A${row}`); // { name, content } ??
                let question = cell.content;
                let answers = cellList.filter((c: any) => c.name !== `A${row}`)
                    .map((c: any) => c.content);
                return { question, answers };
            })
    }

    readQApairs(startRow: number | string, end: number | string): Promise<Array<QApair>> {
        // let names = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1']; // A1 = question and B1-F1 = 5 answers
        let namess = [`A${startRow}`, `B${startRow}`, `C${startRow}`, `D${startRow}`, `E${startRow}`, `F${startRow}`];
        let namees = [`A${end}`, `B${end}`, `C${end}`, `D${end}`, `E${end}`, `F${end}`];
        let nameRange = `A${startRow}:F${end}`;
        return this.gsheetService.readRange(nameRange, this.tab)
            .then(rows => { // [{ name, content }]

                return rows.map((row: any, rowId: number) => { // cellList = [{ name, content }]
                    let cell = row.find((c: any) => c.name === `A${rowId}`); // { name, content } ??
                    let question = cell.content;
                    let answers = row.filter((c: any) => c.name !== `A${rowId}`)
                        .map((c: any) => c.content);
                    return { question, answers };
                })
            });
    }

}

export default GsheetAdapter;