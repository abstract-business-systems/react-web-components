const glob = require('glob');
const path = require('path');
const { reduce } = require('@laufire/utils/collection');

// join multiple extensions as **/*{.js,.jsx}`
const readComponents = (context) => {
	const { config: { entry }} = context;
	const files = glob.sync(entry);

	return { ...context, data: files };
};

const transformPaths = (context) => {
	const { data } = context;
	const entry = reduce(
		data, (acc, filePath) => ({
			...acc,
			[path.parse(filePath).name]: `./${ filePath }`,
		}), {}
	);

	return { ...context, data: entry };
};

const prepareEntry = (config) =>
	transformPaths(readComponents({ config })).data;

module.exports = { prepareEntry };
