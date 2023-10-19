import React from 'react';
import { Grid } from '@mui/material';
import ListItem from '../../../components/List/ListItem';
import DeleteButton from './DeleteButton';
import AddTodo from './AddTodo';
import TextDisplay from './TextDisplay';

const TaskDisplay = (props) => <ListItem { ...props }>
	<Grid
		container={ true }
		justifyContent="center"
		alignItems="center"
	>
		<AddTodo/>
		<TextDisplay/>
		<DeleteButton/>
	</Grid>
</ListItem>;

export default TaskDisplay;
