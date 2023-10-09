import React from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import { Checkbox, Input } from '../../components/WithState';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import TodosDisplay from './TodosDisplay';

const docProps = { initialState };

const toggleAllProps = { value: '/toggleAll/' };

const todoInputProps = { value: '/todo/' };

const restClientProps = {
	name: 'todoClient',
	base: 'http://localhost:3500',
};

const Todos = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<RESTClient { ...restClientProps }/>
			<Checkbox { ...toggleAllProps }/>
			<Input { ...todoInputProps }/>
			<TodosDisplay/>
		</Section>
	</Document>;

export default Todos;
