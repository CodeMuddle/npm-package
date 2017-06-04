import * as fs from 'fs';
import * as readline from 'readline';
let googleAuth = require('google-auth-library');
const credentialsFile = '../.local-data/credentials.json';


let SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //you can add more scopes according to your permission need. But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
const TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json'; //the file which will contain the token

export class Authentication {
  authenticate(){
    return new Promise((resolve, reject)=>{
      let credentials = this.getClientSecret();
      let authorizePromise = this.authorize(credentials);
      authorizePromise.then(resolve, reject);
    });
  }

  getClientSecret(){
    return require(credentialsFile);
  }
  authorize(credentials: any) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve, reject)=>{
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token: any) => {
        if (err) {
          this.getNewToken(oauth2Client).then((oauth2ClientNew: any)=>{
            resolve(oauth2ClientNew);
          }, (err: any)=>{
            reject(err);
          });
        } else {
          oauth2Client.credentials = JSON.parse(token);
          resolve(oauth2Client);
        }
      });
    });
  }
  getNewToken(oauth2Client: any, callback?: any) {
    return new Promise((resolve, reject)=>{
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: \n ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('\n\nEnter the code from that page here: ', (code) => {
        rl.close();
        oauth2Client.getToken(code, (err: any, token: any) => {
          if (err) {
            console.log('Error while trying to retrieve access token', err);
            reject();
          }
          oauth2Client.credentials = token;
          this.storeToken(token);
          resolve(oauth2Client);
        });
      });
    });
  }
  storeToken(token: any) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }
}

export const authentication = new Authentication();
