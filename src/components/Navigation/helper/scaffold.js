const { reduce, sort } = require('@laufire/utils/collection');
const { parts, resolve, unescape } = require('@laufire/utils/path');
const { reverse } = require('@laufire/utils/sorters');

const scaffold = (path, data = {}) => {
	const reducer = (acc, c) => ({ [unescape(c)]: acc });

	return reduce(
		sort(parts(resolve('/', path)), reverse), reducer, data
	);
};

export default scaffold;
