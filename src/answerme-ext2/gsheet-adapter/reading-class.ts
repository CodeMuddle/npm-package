const google1 = require('googleapis');

export function getData(
	cell: string,
	tab: string,
	spreadsheetId: string,
	auth: any
): Promise<{ name: string; content: string }> {
	return new Promise((resolve, reject) => {
		const sheets = google1.sheets('v4');
		const range = `${tab}!${cell}`;
		sheets.spreadsheets.values.get(
			{
				auth,
				range, // Change Sheet1 if your worksheet's name is something else
				spreadsheetId,
			},
			(err: Error, response: any) => {
				if (err) {
					console.log('The API returned an error: ' + err);
					return reject(err);
				}

				const name = cell;
				let content;
				const rows = response.values;
				if (rows && rows.length > 0) {
					// for (const i = 0; i < rows.length; i++) {
					// content = rows[i];
					// console.log(content);
					// }
					content = rows[0][0]; // @TODO is it always the case?
				}
				// else console.log('No data found.');

				return resolve({ name, content });
			}
		);
	});
}

export function getRangeData(
	cellRange: string,
	tab: string,
	spreadsheetId: string,
	auth: any
): Promise<Array<Array<{ name: string; content: string }>>> {
	return new Promise((resolve, reject) => {
		const sheets = google1.sheets('v4');
		const range = `${tab}!${cellRange}`;
		sheets.spreadsheets.values.get(
			{
				auth,
				range, // Change Sheet1 if your worksheet's name is something else
				spreadsheetId,
			},
			(err: Error, response: any) => {
				if (err) {
					console.log('The API returned an error: ' + err);
					return reject(err);
				}

				const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // ...
				const startName = cellRange.split(':')[0];
				const stopName = cellRange.split(':')[1];
				// let content = null;
				const rows = response.values;
				const cellList: Array<Array<{ name: string; content: string }>> = [];
				if (rows && rows.length > 0) {
					for (let i = 0; i < rows.length; i++) {
						const row = rows[i];
						// console.log(content);
						cellList.push(
							row.map((cell: any, idx: number) => {
								const name = `${columns[idx]}${i + 1}`;
								const content = cell;
								console.log(name, content);
								return { name, content };
							})
						);
					}
				}
				// else console.log('No data found.');

				return resolve(cellList);
			}
		);
	});
}
