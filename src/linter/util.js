import {sep as pathSeparator} from 'path';

export function error(filename, item, data = {}) {
	let key = filename.substr(1, filename.length - 4).split(pathSeparator);
	key.shift();
	key.shift();
	key = key.join('.');
	let doc = getDocs(key);
	let msg = doc.split('\n')[0].substr(2);
	item.errors = item.errors || [];
	item.errors.push({key, msg, data});
}

export function allSources(image) {
	let sources = image.data.sources.slice(0);
	if (image.data.img) {
		sources.push(image.data.img);
	}
	return sources;
}

/*global require*/
let docs = JSON.parse(require('fs').readFileSync(__dirname + '/../../tmp/docs.json', 'utf-8'));

export function getDocs(key, section) {

	let doc = docs[key];

	if (!section) {
		return doc;
	}

	if (section === 'text') {
		doc = doc.split(/^#[^\n]*/);
	}
	else {
		doc = doc.split('\n\n## ' + section + '\n\n');
	}

	if (doc.length < 2) {
		return '';
	}

	return doc[1].split('\n\n##')[0].trim();

}
