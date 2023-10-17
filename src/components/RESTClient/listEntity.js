import axios from 'axios';
import { reduce } from '@laufire/utils/collection';
import getId from '../common/helper/getId';

const listData = (data) =>
	reduce(
		data, (acc, curr) => {
			const id = getId();

			return {
				data: {
					...acc.data,
					[id]: {
						id: id,
						data: curr,
						meta: { status: 'synced' },
					},
				},
			};
		}, { data: {}}
	);

const sendListMessage = ({ sendMessage, response, path }) => {
	sendMessage({
		data: listData(response.data),
		path: path,
		action: 'list',
		entity: 'state',
	});
};

const sendErrorMessage = ({ sendMessage, error, path }) => {
	sendMessage({
		data: { meta: { error }},
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const listEntities = async ({ current: { base, sendMessage }, entity, to }) => {
	const path = `${ to }data/${ entity }/`;

	try {
		const response = await axios(`${ base }/${ entity }`);

		sendListMessage({ sendMessage, response, path });

		return response;
	}
	catch (error) {
		sendErrorMessage({ sendMessage, error, path });

		return error;
	}
};

export default listEntities;
