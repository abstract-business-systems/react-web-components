import { range } from '@laufire/utils/collection';

const tile = (data, length) => {
	const repeat = Math.ceil(length / data.length);
	const duplicates = range(0, repeat)
		.reduce((acc) => acc.concat(data), []);

	return duplicates.slice(0, length);
};

export default tile;
