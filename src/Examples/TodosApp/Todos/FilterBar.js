import React from 'react';
import { Button } from '../../../components/WithState';

const allProps = { onClick: { data: 'all', path: '/filterTodo/' }};
const activeProps = { onClick: { data: 'active', path: '/filterTodo/' }};
const completedProps = { onClick: { data: 'completed', path: '/filterTodo/' }};

const FilterBar = () => <div>
	<Button { ...allProps }>All</Button>
	<Button { ...activeProps }>Active</Button>
	<Button { ...completedProps }>Completed</Button>
</div>;

export default FilterBar;
