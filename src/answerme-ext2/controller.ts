import { defineGsheet, read, write } from './service';
// import * as gsheetService from './service';

export class GsheetService {
    private config: { [key: string]: any };
    constructor(docId: string, credentials: { [key: string]: any }, tokenStore: string) {
        this.config = { docId, credentials, tokenStore }
    }

    read() {
        let { docId, credentials, tokenStore } = this.config;
        return defineGsheet(docId, credentials, tokenStore)
            .then(gsheet => {
                // @returns { name: 'A1', content: string }
                return read('C1', 'EXPLANATIONS_TABLE').then(out => out);
            });

    }
}

export class GsheetAdapter {
    public static GsheetService = GsheetService;
    constructor() {}
}

export default GsheetAdapter;