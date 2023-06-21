import { pick } from '@laufire/utils/collection';

const dataFormatter = {
	enum: (items) => items.enum,
	oneOf: ({ oneOf }) => pick(oneOf, 'const'),
};

export default dataFormatter;
