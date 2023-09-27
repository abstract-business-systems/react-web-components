import React from 'react';
import { Input, Transformation } from '../../components/WithState';
import ListItem from '../../components/List/ListItem';
import {
	Display,
	Button as ButtonWithContext,
} from '../../components/WithContext';

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
};

const inputProps = { value: './data/title/' };

const transformDisableProps = {
	fn: ({ data }) => ({ disabled: data?.status === 'deleting' }),
	value: { disabled: false },
	data: './meta/',
	name: 'local',
};

const Todo = (props) => <ListItem { ...props }>
	<Transformation { ...transformDisableProps }/>
	<Input { ...inputProps }/>
	<Display value="./data/title/"/>
	<ButtonWithContext { ...deleteButtonProps }>delete</ButtonWithContext>
	<ButtonWithContext { ...savButtonProps }>save</ButtonWithContext>
</ListItem>;

export default Todo;
