var google1 = require('googleapis');

export function getData(cell: string, tab: string, spreadsheetId: string, auth: any): Promise<{ name: string, content: string }> {

  return new Promise((resolve, reject) => {

    let sheets = google1.sheets('v4');
    let range = `${tab}!${cell}`;
    sheets.spreadsheets.values.get({
      range, //Change Sheet1 if your worksheet's name is something else
      spreadsheetId, auth,
    }, (err: Error, response: any) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return reject(err);
      }

      let name = cell, content;
      var rows = response.values;
      if (rows && rows.length > 0) {
        // for (var i = 0; i < rows.length; i++) {
        // content = rows[i];
        // console.log(content);
        // }
        content = rows[0][0]; // @TODO is it always the case?
      }
      // else console.log('No data found.');

      return resolve({ name, content });
    });

  });

}