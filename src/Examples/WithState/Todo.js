import React from 'react';
import { Transformation } from '../../components/WithState';
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

const transformProps = {
	fn: ({ data }) => ({ disabled: data?.status === 'deleting' }),
	value: { disabled: false },
	data: './meta/',
	name: 'local',
};

const Todo = (props) => <ListItem { ...props }>
	<Transformation { ...transformProps }/>
	<Display value="./data/title/"/>
	<ButtonWithContext { ...deleteButtonProps }>delete</ButtonWithContext>
</ListItem>;

export default Todo;
