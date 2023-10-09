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

const deleteEntity = async ({ base, entity, data, sendMessage, path }) => {
	sendUpdateMessage({ data, path, sendMessage });

	try {
		await axios.delete(`${ base }/${ entity }/${ data.data.id }`);
		sendDeleteMessage({ data, path, sendMessage });
	}
	catch (error) {
		sendErrorMessage({ error, path, sendMessage });
	}
};

export default deleteEntity;
