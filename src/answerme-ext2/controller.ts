import { defineGsheet, read, write, update } from './service';
// import * as gsheetService from './service';

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
}

export class GsheetAdapter {
    public static GsheetService = GsheetService;
    constructor() {}
}

export default GsheetAdapter;