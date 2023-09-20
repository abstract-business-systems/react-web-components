import { map } from '@laufire/utils/collection';
import { inferType } from '@laufire/utils/reflection';

const actions = {
	array: (options) => options,
	object: (options) =>
		map(options, (component, value) => ({
			value,
			component,
		})),
};

const denormalize = ({ options }) => {
	const type = inferType(options);

	return actions[type](options);
};

export default denormalize;
