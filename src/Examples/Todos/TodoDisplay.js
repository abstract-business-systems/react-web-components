import React from 'react';
import ListItem from '../../components/List/ListItem';
import { Display } from '../../components/WithContext';
import { Checkbox } from '../../components/WithState';
import { Box } from '@mui/material';

const toggleProps = {
	value: './data/completed/',
	onChange: {
		to: '/todoClient/',
		action: 'patch',
		entity: 'todos',
	},
};

const TodoDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<Checkbox { ...toggleProps }/>
		<Display value="./data/text/"/>
	</Box>
</ListItem>;

export default TodoDisplay;
