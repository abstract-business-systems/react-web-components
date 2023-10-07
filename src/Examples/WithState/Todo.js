import React from 'react';
import { Input, Transformation } from '../../components/WithState';
import ListItem from '../../components/List/ListItem';
import {
	Display,
	Button as ButtonWithContext,
} from '../../components/WithContext';
import { isDefined } from '@laufire/utils/reflection';
import { defined } from '@laufire/utils/fn';

const deleteButtonProps = {
	onClick: {
		action: 'delete',
		entity: 'todos',
		to: '/apiClient/',
	},
	disabled: './local/disabled/',
};

const savButtonProps = {
	onClick: {
		action: 'patch',
		entity: 'todos',
		to: '/apiClient/',
	},
	disabled: './localOne/update/',
};

const inputProps = { value: './data/title/' };

const transformDisableProps = {
	fn: ({ data }) => ({ disabled: data?.status === 'deleting' }),
	value: { disabled: false },
	data: './meta/',
	name: 'local',
};

const transformUpdateInput = {
	data: './data/title/',
	name: 'localOne',
	value: { update: true },
	meta: './meta/status/',
	fn: ({ data: currData, value: { data: preData }, meta }) => {
		const update = meta === 'syncing'
			? true
			: !(isDefined(preData) && preData !== currData);
		const data = meta === 'syncing' ? currData : defined(preData, currData);

		return {
			data,
			update,
		};
	},
};

const Todo = (props) => <ListItem { ...props }>
	<Transformation { ...transformDisableProps }/>
	<Transformation { ...transformUpdateInput }/>
	<Input { ...inputProps }/>
	<Display value="./data/title/"/>
	<ButtonWithContext { ...deleteButtonProps }>delete</ButtonWithContext>
	<ButtonWithContext { ...savButtonProps }>save</ButtonWithContext>
</ListItem>;

export default Todo;
