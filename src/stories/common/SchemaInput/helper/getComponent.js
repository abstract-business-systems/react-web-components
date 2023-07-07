import { find } from '@laufire/utils/collection.js';

const getComponent = (schema, components) =>
	find(components, (component) =>
		component(schema))(schema);

export default getComponent;
