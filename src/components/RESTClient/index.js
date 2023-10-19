import React from 'react';
import { merge } from '@laufire/utils/collection';
import listEntities from './listEntity';
import createEntity from './createEntity';
import updateEntity from './updateEntity';
import deleteEntity from './deleteEntity';
import Services from '../Services';

const actions = {
	list: listEntities,

	create: createEntity,

	patch: updateEntity,

	delete: deleteEntity,
};

const RESTClient = ({ ...props }) =>
	<Services { ...merge(props, { actions }) }/>;

export default RESTClient;
