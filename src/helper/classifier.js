import { reduce, findIndex } from '@laufire/utils/collection';

const classify = (collection, classifiers) =>
	reduce(collection, (
		acc, value, key
	) =>
		findIndex(classifiers, (classifier) =>
			classifier(
				value, key, collection
			)));

export default classify;
