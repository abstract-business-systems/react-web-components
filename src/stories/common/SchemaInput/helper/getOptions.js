import { pick } from '@laufire/utils/collection';

const getOptions = (items, labels) => {
	const values = items.enum || pick(items.oneOf, 'const');

	return values.map((val, i) => ({
		value: val,
		label: labels[i],
	}));
};

export default getOptions;
