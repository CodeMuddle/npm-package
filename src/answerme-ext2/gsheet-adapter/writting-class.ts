let google = require('googleapis');

/**
 * you can only write to an empty cell
 * @param auth
 */
export function writeData(
	content: string,
	cell: string,
	tab: string,
	spreadsheetId: string,
	auth: any
): Promise<{ name: string; content: string }> {
	return new Promise((resolve, reject) => {
		const sheets = google.sheets('v4');
		const range = `${tab}!${cell}`;

		sheets.spreadsheets.values.update(
			{
				auth,
				range,
				resource: {
					values: [[content]],
				},
				spreadsheetId,
				valueInputOption: 'USER_ENTERED',
			},
			(err: Error, response: any) => {
				const name = cell;
				if (err) {
					console.log('The API returned an error: ' + err);
					return reject(err);
				} else {
					// console.log(response);
				}

				return resolve({ name, content });
			}
		);
	});
}
export function appendData(auth: any) {
	const sheets = google.sheets('v4');
	sheets.spreadsheets.values.append(
		{
			auth,
			range: 'Sheet1!A2:B', // Change Sheet1 if your worksheet's name is something else
			resource: {
				values: [['Void', 'Canvas', 'Website'], ['Paul', 'Shan', 'Human']],
			},
			spreadsheetId: 'yourSpreadSheetIDHere',
			valueInputOption: 'USER_ENTERED',
		},
		(err: Error, response: any) => {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
			} else {
				console.log('Appended');
			}
		}
	);
}
