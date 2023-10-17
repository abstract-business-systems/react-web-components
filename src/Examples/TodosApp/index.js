import React from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import Section from '../../components/Section';
import { Box } from '@mui/material';
import Tasks from './Tasks';
import Todos from './Todos';

const docProps = { initialState };

const TodosApp = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<Box display="flex">
				<Todos/>
				<Tasks/>
			</Box>
		</Section>
	</Document>;

export default TodosApp;
