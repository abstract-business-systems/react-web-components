import { merge } from '@laufire/utils/collection';
import axios from 'axios';

const sendUpdateMessage = ({ data, path, sendMessage }) => {
	sendMessage({
		data: merge(data, { meta: { status: 'syncing' }}),
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const sendUpdatedMessage = ({ data, path, sendMessage }) => {
	sendMessage({
		data: merge({ data }, { meta: { status: 'updated' }}),
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const sendErrorMessage = ({ error, sendMessage, path }) => {
	sendMessage({
		data: { meta: { error }},
		path: path,
		action: 'update',
		entity: 'state',
	});
};

const updateEntity = async ({ base, entity, data, sendMessage, path }) => {
	sendUpdateMessage({ data, path, sendMessage });

	try {
		const response = await axios.put(
			`${ base }/${ entity }/${ data.data.id }`,
			data.data,
			{ headers: { 'Content-type': 'application/json; charset=UTF-8' }}
		);

		sendUpdatedMessage({ ...response, path, sendMessage });
	}
	catch (error) {
		sendErrorMessage({ error, sendMessage, path });
	}
};

export default updateEntity;
