import { map, range, reduce } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';

// eslint-disable-next-line no-magic-numbers
const uuid = [8, 4, 4, 4, 12];
const hex = '0123456789ABCDEF';

const getId = () => {
	const hexLength = hex.length;

	const getHexCharacter = () => hex.charAt(rndBetween(0, hexLength));

	const getHexString = (length) => reduce(
		range(0, length), (acc) => acc + getHexCharacter(), ''
	);

	return map(uuid, (length) => getHexString(length)).join('-');
};

export default getId;
