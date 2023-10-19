import React, { Fragment } from 'react';
import TodosDisplay from './TodosDisplay';
import TodoRESTClient from './TodoRESTClient';
import CreateTodoTransform from './CreateTodoTransform';
import InputPanel from './InputPanel';
import Header from './Header';
import Footer from './Footer';

const Todos = () =>
	<Fragment>
		<TodoRESTClient/>
		<CreateTodoTransform/>
		<Header/>
		<InputPanel/>
		<TodosDisplay/>
		<Footer/>
	</Fragment>;

export default Todos;
