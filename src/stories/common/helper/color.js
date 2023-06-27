import { reduce } from '@laufire/utils/collection';

const hexadecimalBase = 16;
const desiredLength = 2;

const color = {
	rgbToHex: (data) => reduce(
		data, (acc, cur) => acc.concat(cur.toString(hexadecimalBase)
			.padStart(desiredLength, '0')), '#'
	),
};

export default color;
