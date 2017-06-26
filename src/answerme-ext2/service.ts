import { defineGsheet, ICell, isArray, readMultiple, readOne, readRange, update, write } from './gsheet-adapter';

export class GsheetService {
	private config: { [key: string]: any };
	constructor(docId: string, credentials: { [key: string]: any }, tokenStore: string) {
		this.config = { docId, credentials, tokenStore };
	}

	// Overload the read method (i.e. bind input types to output type)
	public read(name: string, tab: string): Promise<ICell>;
	public read(names: string[], tab: string): Promise<ICell[]>;
	public read(name: string | string[], tab: string): Promise<ICell | ICell[]> {
		const { docId, credentials, tokenStore } = this.config;
		return isArray(name)
			? defineGsheet(docId, credentials, tokenStore).then(gsheet => readMultiple(name, tab))
			: defineGsheet(docId, credentials, tokenStore).then(gsheet => readOne(name, tab));
	}

	public write(content: string, name: string, tab: string) {
		const { docId, credentials, tokenStore } = this.config;
		return defineGsheet(docId, credentials, tokenStore).then(gsheet => {
			// @returns { name: 'A1', content: string }
			return write(content, name, tab).then(out => out);
		});
	}
	public update(content: string, name: string, tab: string) {
		const { docId, credentials, tokenStore } = this.config;
		return defineGsheet(docId, credentials, tokenStore).then(gsheet => {
			// @returns { name: 'A1', content: string }
			return update(content, name, tab).then(out => out);
		});
	}
	public readRange(name: string, tab: string) {
		const { docId, credentials, tokenStore } = this.config;
		return defineGsheet(docId, credentials, tokenStore).then(gsheet => {
			// @returns { name: 'A1', content: string }
			return readRange(name, tab).then(out => out);
		});
	}
}
