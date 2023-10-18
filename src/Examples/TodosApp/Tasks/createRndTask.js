import { rndString } from '@laufire/utils/random';

const createRndTask = (props) => {
	const data = { text: rndString() };

	return props.actions.create({ ...props, data });
};

export default createRndTask;
