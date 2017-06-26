import { Authentication } from './authentication-class';
import { getData, getRangeData } from './reading-class';
import { writeData } from './writting-class';

export interface ICell {
    name: string;
    content: string;
}

export let config: { [key: string]: any } = null;
/**
 *
 * @param docId
 * @param credentialsFile
 * @param tokenStore {string} folder which stores the file that contains the generated token
 */
export function defineGsheet(docId: string, credentialsFile: { [key: string]: any }, tokenStore: string): Promise<any> {
	// do all setup needed
	// then save result inside the config file
	return new Authentication().authenticate(credentialsFile, tokenStore).then((auth: any) => {
		config = Object.assign({}, config, { docId, auth });
		return { docId, auth };
	});
}

// type guard
export function isArray(arg: any): arg is string[] {
	return !!arg && typeof arg.map === 'function';
}

// Overload the read method (i.e. bind input types to output type)
export function read(name: string, tab: string): Promise<ICell>;
export function read(names: string[], tab: string): Promise<ICell[]>;
/**
 * @param name {string| string[]} the cell name ex: A1, B5
 */
export function read(
	name: string | string[],
	tab: string
): Promise<ICell | ICell[]> {
	return isArray(name) ? readMultiple(name, tab) : readOne(name, tab);
}

export function readOne(name: string, tab: string): Promise<ICell> {
	const { docId, auth } = config;
	return getData(name, tab, docId, auth);
}
export function readMultiple(names: string[], tab: string): Promise<ICell[]> {
	return Promise.all(names.map(name => readOne(name, tab)));
}

export function readRange(name: string, tab: string): Promise<ICell[][]> {
	const { docId, auth } = config;
	return getRangeData(name, tab, docId, auth);
}

/**
 * @param content
 * @param name
 * @param tab
 */
export function write(
	content: string,
	name: string,
	tab: string
): Promise<ICell | ICell[]> {
	return writeOne(content, name, tab);
}
// write only if no content exixt
export function writeOne(
	content: string,
	name: string,
	tab: string
): Promise<ICell | ICell[]> {
	const { docId, auth } = config;
	return readOne(name, tab).then(
		r =>
			!r.content
				? writeData(content, name, tab, docId, auth)
				: Promise.reject('You can only write to an empty cell!')
	);
}
export function update(
	content: string,
	name: string,
	tab: string
): Promise<ICell | ICell[]> {
	return updateOne(content, name, tab);
}
// update only if content exixt
export function updateOne(
	content: string,
	name: string,
	tab: string
): Promise<ICell | ICell[]> {
	const { docId, auth } = config;
	return readOne(name, tab).then(
		r =>
			r.content
				? writeData(content, name, tab, docId, auth)
				: Promise.reject('You can only update a filled cell!')
	);
}

export default {
	defineGsheet,
	read,
	update,
	write,
};
