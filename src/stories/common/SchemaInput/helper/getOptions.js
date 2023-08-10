import { pick } from '@laufire/utils/collection';

const getOptions = (items = {}, labels = []) => {
	const values = items.enum || pick(items.oneOf, 'const');

	return values.map((value, i) => ({
		value: value,
		label: labels[i] || value,
	}));
};

export default getOptions;
