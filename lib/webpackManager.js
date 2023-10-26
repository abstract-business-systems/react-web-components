const { sync } = require('glob');
const path = require('path');
const { reduce, map } = require('@laufire/utils/collection');
const { parts } = require('@laufire/utils/path');

// join multiple extensions as **/*{.js,.jsx}`
const readComponents = (context) => {
	const { config: { entries }} = context;
	const files = map(entries, (entry) => sync(entry)).flat();

	return { ...context, data: files };
};

const transformPaths = (context) => {
	const { data } = context;
	const entry = reduce(
		data, (acc, filePath) => {
			const { name: fileName, dir } = path.parse(filePath);

			const record = fileName === 'index'
				? { [parts(dir)[parts(dir).length - 1]]: `./${ filePath }` }
				: { [fileName]: `./${ filePath }` };

			return {
				...acc,
				...record,
			};
		}, {}
	);

	return { ...context, data: entry };
};

const prepareEntry = (config) =>
	transformPaths(readComponents({ config })).data;

module.exports = { prepareEntry };
