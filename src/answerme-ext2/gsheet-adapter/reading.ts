var google1 = require('googleapis');
var authentication1 = require('./authentication');

export function getData(auth: any) {
  var sheets = google1.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: 'yourSpreadSheetIDHere',
    range: 'Sheet1!A2:C', //Change Sheet1 if your worksheet's name is something else
  }, (err: Error, response: any) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log(row.join(', '));
      }
    }
  });
}

authentication1.authenticate().then((auth: any) => {
  getData(auth);
});
