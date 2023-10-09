import { merge } from '@laufire/utils/collection';
import axios from 'axios';

const sendCreateMessage = ({ data, path, sendMessage }) =>
	sendMessage({
		data: merge({ data }, { meta: { status: 'synced' }}),
		path: path,
		action: 'create',
		entity: 'state',
	});

const sendUpdateMessage = ({ data, path, sendMessage, id }) => {
	sendMessage({
		data: merge({ data: data, meta: { status: 'synced' }}),
		path: `${ path }/${ id }/`,
		action: 'update',
		entity: 'state',
	});
};

const sendErrorMessage = ({ error, sendMessage, path, id }) => {
	sendMessage({
		data: { meta: { error }},
		path: `${ path }/${ id }/`,
		action: 'update',
		entity: 'state',
	});
};

const createEntity = async ({ base, entity, data, sendMessage, to }) => {
	const path = `${ to }data/${ entity }/data/`;
	const { id } = sendCreateMessage({ data, path, sendMessage });

	try {
		const response = await axios.post(
			`${ base }/${ entity }`,
			data,
			{ headers: { 'Content-type': 'application/json; charset=UTF-8' }}
		);

		sendUpdateMessage({ ...response, path, sendMessage, id });
	}
	catch (error) {
		sendErrorMessage({ error, path, sendMessage, id });
	}
};

export default createEntity;
