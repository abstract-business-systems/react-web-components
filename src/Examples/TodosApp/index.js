import React from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import Section from '../../components/Section';
import { Grid } from '@mui/material';
import Tasks from './Tasks';
import Todos from './Todos';

const docProps = { initialState };

const TodosApp = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<Grid container={ true }>
				<Grid item={ true } xs={ 6 }><Todos/></Grid>
				<Grid item={ true } xs={ 6 }><Tasks/></Grid>
			</Grid>
		</Section>
	</Document>;

export default TodosApp;
