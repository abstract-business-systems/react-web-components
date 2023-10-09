import React from 'react';
import ListItem from '../../components/List/ListItem';
import { Display } from '../../components/WithContext';
import { Checkbox } from '../../components/WithState';

const toggleProps = {
	value: './data/completed/',
	onChange: {
		to: '/todoClient/',
		action: 'patch',
		entity: 'todos',
	},
};

const TodoDisplay = (props) => <ListItem { ...props }>
	<Checkbox { ...toggleProps }/>
	<Display value="./data/text/"/>
</ListItem>;

export default TodoDisplay;
