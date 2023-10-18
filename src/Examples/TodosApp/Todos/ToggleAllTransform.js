import React from 'react';
import { filter, length } from '@laufire/utils/collection';
import { falsy } from '@laufire/utils/predicates';
import { filters } from './FilterTodosTransform';
import { Transformation } from '../../../components/WithState';

const ToggleAllTransformProps = {
	data: '/filterTodos/data/',
	onChange: { path: '/toggleAll/' },
	fn: ({ data = {}}) => falsy(length(filter(data, filters.active))),
};

const ToggleAllTransform = () =>
	<Transformation { ...ToggleAllTransformProps }/>;

export default ToggleAllTransform;
