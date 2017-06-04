var GsheetAdapter = require('../dist/index.js').GsheetAdapter;
var GsheetService = GsheetAdapter.GsheetService;

// provide all info needed to identify the google sheet you want to read/write from
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
let docId = '12LLE-BdUtUCsirqNroThFCc7DSKKfhvUQ-S5Zi1Obkg',
    // credentials = require('../.local-data/credentials.json'),
    credentials = {"installed":{"client_id":"1017997956763-8598k3vlb705cnobhi786222tjfnstrq.apps.googleusercontent.com","project_id":"amazing-smile-166717","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Qg6bAuzIO-q5-6Mbp3OT2RSL","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}},
    tokenStore = TOKEN_DIR; // the folder where the tokenfile is placed

let gsheetService = new GsheetService(docId, credentials, tokenStore);

gsheetService.read('C1', 'EXPLANATIONS_TABLE')
.then(out => console.log(out));

gsheetService.write('John Smith', 'C4', 'EXPLANATIONS_TABLE')
.then(out => console.log(out))
.catch(out => console.error(out));

gsheetService.update('John Smith 1', 'C5', 'EXPLANATIONS_TABLE')
.then(out => console.log(out))
.catch(out => console.error(out));

// gsheetService.defineGsheet(docId, credentials, tokenStore)
//     .then(gsheet => {
//         // read content of cell A1, located in tab named EXPLANATIONS_TABLE
//         // @returns { name: 'A1', content: string }
//         let cellA1 = gsheetService.read('C1', 'EXPLANATIONS_TABLE')
//         .then(out => console.log(out));
//         // read content of cell A1 and A2     

//         gsheetService.write('John Smith', 'C4', 'EXPLANATIONS_TABLE')
//         .then(out => console.log(out))       
//         .catch(out => console.error(out));       

//         gsheetService.update('John Smith 1', 'C5', 'EXPLANATIONS_TABLE')
//         .then(out => console.log(out))
//         .catch(out => console.error(out));       
        
//     });