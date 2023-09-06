import { findIndex } from '@laufire/utils/collection';

const classify = ({ collection = {}, classifiers }) =>
	findIndex(classifiers, (classifier) =>
		classifier(collection));

export default classify;
