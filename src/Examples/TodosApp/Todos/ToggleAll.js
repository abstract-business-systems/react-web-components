import React, { Fragment } from 'react';
import { Checkbox, Transformation } from '../../../components/WithState';
import { falsy } from '@laufire/utils/predicates';
import { filter, length } from '@laufire/utils/collection';
import { filters } from './FilterTodosTransform';

const toggleAllProps = {
	value: '/toggleAll/',
	onChange: [
		{ to: '/' },
		{
			action: 'updateAll',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
	],
};

const isToggleAllProps = {
	data: '/filterTodos/data/',
	onChange: { path: '/toggleAll/' },
	fn: ({ data = {}}) => falsy(length(filter(data, filters.active))),
};

const ToggleAll = () =>
	<Fragment>
		<Transformation { ...isToggleAllProps }/>
		<Checkbox { ...toggleAllProps }/>
	</Fragment>;

export default ToggleAll;
