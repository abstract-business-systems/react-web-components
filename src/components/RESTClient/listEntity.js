import axios from 'axios';
import splitPath from '../common/helper/splitPath';
import { reduce } from '@laufire/utils/collection';
import getId from '../common/helper/getId';

const listData = (data) =>
	reduce(
		data, (acc, curr) => {
			const id = getId();

			return {
				...acc, [id]: {
					id: id,
					data: curr,
					meta: { status: 'synced' },
				},
			};
		}, {}
	);

const listEntities = async ({ base, entity, sendMessage, path }) => {
	try {
		const response = await axios(`${ base }/${ entity }`);

		sendMessage({
			data: listData(response.data),
			path: path,
			action: 'list',
			entity: 'state',
		});
	}
	catch (error) {
		sendMessage({
			data: { meta: { error }},
			path: splitPath(path).parent,
			action: 'update',
			entity: 'state',
		});
	}
};

export default listEntities;
