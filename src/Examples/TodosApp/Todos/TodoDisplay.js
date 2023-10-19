import React from 'react';
import ListItem from '../../../components/List/ListItem';
import { Checkbox, Display } from '../../../components/WithState';
import DeleteButton from './DeleteButton';
import { Grid } from '@mui/material';

const toggleProps = {
	value: './data/completed/',
	onChange: [
		{
			to: '/',
			action: 'patch',
		},
		{
			to: '/todoClient/',
			action: 'patch',
			entity: 'todos',
			data: '../../',
		},
	],
};

const displayProps = {
	value: './data/text/',
	onClick: [
		{ data: '../../', path: '/editing/data/' },
		{ data: 'edit', path: '/editing/status/' },
	],
};

const TodoDisplay = (props) => <ListItem { ...props }>
	<Grid
		container={ true }
		justifyContent="center"
		alignItems="center"
	>
		<Grid item={ true } xs={ 1 }><Checkbox { ...toggleProps }/></Grid>
		<Grid item={ true } xs={ 4 }><Display { ...displayProps }/></Grid>
		<Grid item={ true } xs={ 2 }><DeleteButton/></Grid>
	</Grid>
</ListItem>;

export default TodoDisplay;
