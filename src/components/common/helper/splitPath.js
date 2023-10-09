import { parts, resolve } from '@laufire/utils/path';

const splitPath = (path) => {
	const partsArray = parts(path);
	const parent = resolve(...partsArray.slice(0, partsArray.length - 1));
	const leaf = partsArray[partsArray.length - 1];

	return { parent, leaf };
};

export default splitPath;
