let google = require('googleapis');

/**
 * you can only write to an empty cell
 * @param auth 
 */
export function writeData(content: string, cell: string, tab: string, spreadsheetId: string, auth: any):
  Promise<{ name: string, content: string }> {
  return new Promise((resolve, reject) => {

    var sheets = google.sheets('v4');
    let range = `${tab}!${cell}`;

    sheets.spreadsheets.values.update({
      auth, spreadsheetId, range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[content]]
      }
    }, (err: Error, response: any) => {
      let name = cell;
      if (err) {
        console.log('The API returned an error: ' + err);
        return reject(err);
      } else {
        // console.log(response);
      }

      return resolve({ name, content });

    });
  });
}
export function appendData(auth: any) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: 'yourSpreadSheetIDHere',
    range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['Void', 'Canvas', 'Website'], ['Paul', 'Shan', 'Human']]
    }
  }, (err: Error, response: any) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log('Appended');
    }
  });
}
