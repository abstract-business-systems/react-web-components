import { merge } from '@laufire/utils/collection';
import axios from 'axios';

const sendCreateMessage = ({ data, path, sendMessage }) =>
	sendMessage({
		data: merge({ data }, { meta: { status: 'syncing' }}),
		path: path,
		action: 'create',
		entity: 'state',
	});

const sendUpdateMessage = ({ data, path, sendMessage, id }) => {
	sendMessage({
		data: merge({ data: data, meta: { status: 'synced' }}),
		path: `${ path }${ id }/`,
		action: 'update',
		entity: 'state',
	});
};

const sendErrorMessage = ({ error, sendMessage, path, id }) => {
	sendMessage({
		data: { meta: { error }},
		path: `${ path }${ id }/`,
		action: 'update',
		entity: 'state',
	});
};

const createEntity = async ({
	current: { base, sendMessage },
	entity, data, to,
}) => {
	const path = `${ to }data/${ entity }/data/`;
	const { id } = sendCreateMessage({ data, path, sendMessage });

	try {
		const response = await axios.post(
			`${ base }/${ entity }`,
			data,
			{ headers: { 'Content-type': 'application/json; charset=UTF-8' }}
		);

		sendUpdateMessage({ ...response, path, sendMessage, id });

		return response;
	}
	catch (error) {
		sendErrorMessage({ error, path, sendMessage, id });

		return error;
	}
};

export default createEntity;
