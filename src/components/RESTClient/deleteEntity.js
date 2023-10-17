import { merge } from '@laufire/utils/collection';
import axios from 'axios';

const sendUpdateMessage = ({ data, path, sendMessage }) => {
	sendMessage({
		data: merge(data, { meta: { status: 'deleting' }}),
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const sendDeleteMessage = ({ data, path, sendMessage }) => {
	sendMessage({
		data: data,
		path: path,
		action: 'delete',
		entity: 'state',
	});
};

const sendErrorMessage = ({ error, path, sendMessage }) => {
	sendMessage({
		data: { meta: { error }},
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const deleteEntity = async ({
	current: { base, sendMessage },
	entity, data, to,
}) => {
	const path = `${ to }data/${ entity }/data/${ data.id }`;

	sendUpdateMessage({ data, path, sendMessage });

	try {
		const response = await axios.delete(`${ base }/${ entity }/${ data.data.id }`);

		sendDeleteMessage({ data, path, sendMessage });

		return response;
	}
	catch (error) {
		sendErrorMessage({ error, path, sendMessage });

		return error;
	}
};

export default deleteEntity;
