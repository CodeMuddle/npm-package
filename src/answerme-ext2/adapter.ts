import { IAdapter } from './interface';
import { GsheetService } from './service';

export interface IQApair {
	question: string;
	answers: string[];
}
export class GsheetAdapter implements IAdapter<IQApair> {
	public static GsheetService = GsheetService;
	public gsheetService: GsheetService;
	private tab: string;
	/**
	 *
	 * @param docId {string} google sheet document id
	 * @param credentials
	 * @param tokenStore
	 * @param tabName
	 */
	constructor(docId: string, credentials: { [key: string]: any }, tokenStore: string, tabName: string) {
		this.gsheetService = new GsheetService(docId, credentials, tokenStore);
		this.tab = tabName;
	}

	public push(item: IQApair): Promise<IQApair> {
		return new Promise(resolve => {
			// @TODO find the first empty row
			const emptyRow = '1';
			return resolve(emptyRow);
		}).then((row: string) => {
			return this.writeQApair(row, item);
		});
	}
	/**
	 * Removes the last qapair from a google sheet and returns it.
	 */
	public pop(): Promise<IQApair> {
		// @TODO implement logic to remove cell content
		return this.readQApair(1);
	}
	/**
	 * fetch one item from the array
	 * @param funct Function that returns a boolean
	 * @returns Promise<ITEM>
	 */
	public find(funct: any): Promise<IQApair> {
		// fetch 100 qa pairs
		// pass each question inside the provided function 'funct'
		// the first that makes funct returns true, belongs to the desired qa pair
		// if none found, keep fetching '100' in batch

		// let rows = ['1', '2', '3', '5', '5', '6']; // ... count till 50
		// let rows = (Array.apply(null, { length: 10 })).map((el: any, i: number) => i + 1);

		// return Promise.all(rows.map((row: number) => this.readQApair(row)))
		return this.readQApairs(1, 10).then(qapairs => {
			// debugger; // @TODO make sure the returned value is an array of qapairs
			const qapair = qapairs.find(funct); // funct = function(qapair, index){ ... }
			if (!qapair) {
				/* goto START */
			}
			return qapair;
		});
	}
	public filter(funct: any): Promise<IQApair[]> {
		// fetch 100 qa pairs
		// pass each question inside the provided function 'funct'
		// the first that makes funct returns true, belongs to the desired qa pair
		// if none found, keep fetching '100' in batch

		// let rows = ['1', '2', '3', '5', '5', '6']; // ... count till 50
		// let rows = (Array.apply(null, { length: 50 })).map((el: any, i: number) => i + 1);

		// return Promise.all(rows.map((row: number) => this.readQApair(row)))
		return this.readQApairs(1, 10).then(qapairs => {
			// debugger; // @TODO make sure the returned value is an array of qapairs
			return qapairs.filter(funct); // funct = function(qapair, index){ ... }
		});
	}
	public writeQApair(row: number | string, qapair: IQApair): Promise<IQApair> {
		const name = `A${row}`; // for question
		const names = [`B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`]; // for answers
		const { question, answers } = qapair;
		return this.gsheetService
			.write(question, name, this.tab)
			.then(record => {
				const saveAnswers = answers.map((answer, i) => {
					const answerName = names[i];
					return this.gsheetService.write(answer, answerName, this.tab);
				});
				return Promise.all(saveAnswers);
			})
			.then(() => qapair);
	}
	/**
	 * for simplicity, we assume that a question can have at most 5 answers
	 * @param row number | string
	 */
	public readQApair(row: number | string): Promise<IQApair> {
		// let names = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1']; // A1 = question and B1-F1 = 5 answers
		const names = [`A${row}`, `B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`];
		return this.gsheetService.read(names, this.tab).then(cellList => {
			// [{ name, content }]
			const cell = cellList.find((c: any) => c.name === `A${row}`); // { name, content } ??
			const question = cell.content;
			const answers = cellList.filter((c: any) => c.name !== `A${row}`).map((c: any) => c.content);
			return { question, answers };
		});
	}

	public readQApairs(startRow: number | string, end: number | string): Promise<IQApair[]> {
		// let names = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1']; // A1 = question and B1-F1 = 5 answers
		// let namess = [`A${startRow}`, `B${startRow}`, `C${startRow}`, `D${startRow}`, `E${startRow}`, `F${startRow}`];
		// let namees = [`A${end}`, `B${end}`, `C${end}`, `D${end}`, `E${end}`, `F${end}`];
		const nameRange = `A${startRow}:F${end}`;
		return this.gsheetService.readRange(nameRange, this.tab).then(rows => {
			// [{ name, content }]

			return rows.map((row: any, rowId: number) => {
				// cellList = [{ name, content }]
				const cell = row.find((c: any) => c.name === `A${rowId + 1}`); // { name, content } ??
				const question = cell.content;
				const answers = row.filter((c: any) => c.name !== `A${rowId + 1}`).map((c: any) => c.content);
				return { question, answers };
			});
		});
	}
}

export default GsheetAdapter;
