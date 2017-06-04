import * as fs from 'fs';
import * as readline from 'readline';
let googleAuth = require('google-auth-library');

let SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //you can add more scopes according to your permission need. But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file

let tokenStoreFile = 'sheets.googleapis.com-nodejs-quickstart.json'

export class Authentication {
  constructor(){}
  authenticate(credentials: { [key: string]: any }, tokenStoreDir: string){
    return new Promise((resolve, reject)=>{
      credentials = this.getClientSecret(credentials);
      let authorizePromise = this.authorize(credentials, tokenStoreDir);
      authorizePromise.then(resolve, reject);
    });
  }
  getClientSecret(credentials: { [key: string]: any }){
    return credentials;
  }
  authorize(credentials: any, tokenStoreDir: string) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve, reject)=>{
      // Check if we have previously stored a token.
      fs.readFile(`${tokenStoreDir}${tokenStoreFile}`, (err, token: any) => {
        if (err) {
          this.getNewToken(oauth2Client, tokenStoreDir, tokenStoreFile).then((oauth2ClientNew: any)=>{
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
  getNewToken(oauth2Client: any, tokenStoreDir: string, tokenStoreFile: string, callback?: any) {
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
          this.storeToken(token, tokenStoreDir, tokenStoreFile);
          resolve(oauth2Client);
        });
      });
    });
  }
  storeToken(token: any, TOKEN_DIR: string, TOKEN_FILE: string) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(`${TOKEN_DIR}${TOKEN_FILE}`, JSON.stringify(token));
    console.log('Token stored to ' + `${TOKEN_DIR}${TOKEN_FILE}`);
  }
}