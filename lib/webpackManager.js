const { sync } = require('glob');
const path = require('path');
const { reduce, map } = require('@laufire/utils/collection');
const { flat } = require("@laufire/utils/reducers");

// join multiple extensions as **/*{.js,.jsx}`
const readComponents = (context) => {
	const { config: { entries }} = context;
	const files = reduce(map(entries, sync), flat, []);

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
